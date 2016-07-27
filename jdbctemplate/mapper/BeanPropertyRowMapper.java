
package com.kk.jdbctemplate;

import java.beans.PropertyDescriptor;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.BeanInstantiationException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.beans.NotWritablePropertyException;
import org.springframework.dao.DataRetrievalFailureException;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.JdbcUtils;
import org.springframework.util.Assert;

/**
 * 根据 clz类型来获取值，会自动转换 下原先和驼峰式写法， spring中也有此类：BeanPropertyRowMapper
 *
 * @param
 */
public class BeanPropertyRowMapper implements RowMapper {

    /**
     * Logger available to subclasses
     */
    protected final Log logger = LogFactory.getLog(getClass());

    /**
     * The class we are mapping to
     */
    private final Class<?> mappedClass;

    /**
     * Map of the fields we provide mapping for
     */
    private Map<String, PropertyDescriptor> mappedFields;

    private final boolean checkColumns;

    private final boolean checkProperties;

    /**
     * Set of bean properties we provide mapping for
     */
    private Set<String> mappedProperties = new HashSet<String>();

    public BeanPropertyRowMapper(Class<?> mappedClass) {
        this(mappedClass, true, false);
    }

    /**
     * Create a new BeanPropertyRowMapper, accepting unpopulated properties
     * in the target bean.
     *
     * @param mappedClass     the class that each row should be mapped to
     * @param checkColumns    true：如果表中有column，但是bean中无此字段则报错
     * @param checkProperties true：如果bean中有field，但是表中无此column则报错
     */
    public BeanPropertyRowMapper(Class<?> mappedClass, boolean checkColumns, boolean checkProperties) {
        this.mappedClass = mappedClass;
        Assert.state(this.mappedClass != null, "Mapped class was not specified");
        this.checkProperties = checkProperties;
        this.checkColumns = checkColumns;
        initialize();
    }

    /**
     * Initialize the mapping metadata for the given class.
     */
    protected void initialize() {
        this.mappedFields = new HashMap<String, PropertyDescriptor>();
        PropertyDescriptor[] pds = BeanUtils.getPropertyDescriptors(mappedClass);
        for (int i = 0; i < pds.length; i++) {
            PropertyDescriptor pd = pds[i];
            if (pd.getWriteMethod() != null) {
                this.mappedProperties.add(pd.getName());
                this.mappedFields.put(pd.getName().toLowerCase(), pd);
                for (String underscoredName : underscoreName(pd.getName())) {
                    if (!pd.getName().toLowerCase().equals(underscoredName)) {
                        this.mappedFields.put(underscoredName, pd);
                    }
                }
            }
        }
    }

    /**
     * Convert a name in camelCase to an underscored name in lower case.
     * Any upper case letters are converted to lower case with a preceding
     * underscore.
     *
     * @param name the string containing original name
     * @return the converted name
     */
    private String[] underscoreName(String name) {
        StringBuilder result = new StringBuilder();
        if (name != null && name.length() > 0) {
            result.append(name.substring(0, 1).toLowerCase());
            for (int i = 1; i < name.length(); i++) {
                String s = name.substring(i, i + 1);
                if (s.equals(s.toUpperCase())) {
                    result.append("_");
                    result.append(s.toLowerCase());
                } else {
                    result.append(s);
                }
            }
        }
        return new String[]{result.toString()};
    }

    /**
     * Extract the values for all columns in the current row.
     * <p/>
     * Utilizes public setters and result set metadata.
     *
     * @see java.sql.ResultSetMetaData
     */
    public Object mapRow(ResultSet rs, int rowNumber) throws SQLException {
        // spring's : Object mappedObject = BeanUtils.instantiateClass(this.mappedClass);
        // jade's : private Object instantiateClass(this.mappedClass);
        // why: 经过简单的笔记本测试，mappedClass.newInstrance性能比BeanUtils.instantiateClass(mappedClass)快1个数量级
        Object mappedObject = instantiateClass(this.mappedClass);
        BeanWrapper bw = new BeanWrapperImpl(mappedObject);

        ResultSetMetaData rsmd = rs.getMetaData();
        int columnCount = rsmd.getColumnCount();

        boolean warnEnabled = logger.isWarnEnabled();
        boolean debugEnabled = logger.isDebugEnabled();
        Set<String> populatedProperties = (checkProperties ? new HashSet<String>() : null);

        for (int index = 1; index <= columnCount; index++) {
            String column = JdbcUtils.lookupColumnName(rsmd, index).toLowerCase();
            PropertyDescriptor pd = this.mappedFields.get(column);
            if (pd != null) {
                try {
                    Object value = JdbcUtils.getResultSetValue(rs, index, pd.getPropertyType());
                    if (debugEnabled && rowNumber == 0) {
                        logger.debug("Mapping column '" + column + "' to property '" + pd.getName()
                                + "' of type " + pd.getPropertyType());
                    }
                    bw.setPropertyValue(pd.getName(), value);
                    if (populatedProperties != null) {
                        populatedProperties.add(pd.getName());
                    }
                } catch (NotWritablePropertyException ex) {
                    throw new DataRetrievalFailureException("Unable to map column " + column
                            + " to property " + pd.getName(), ex);
                }
            } else {
                if (checkColumns) {
                    throw new InvalidDataAccessApiUsageException("Unable to map column '" + column
                            + "' to any properties of bean " + this.mappedClass.getName());
                }
                if (warnEnabled && rowNumber == 0) {
                    logger.warn("Unable to map column '" + column + "' to any properties of bean "
                            + this.mappedClass.getName());
                }
            }
        }

        if (populatedProperties != null && !populatedProperties.equals(this.mappedProperties)) {
            throw new InvalidDataAccessApiUsageException(
                    "Given ResultSet does not contain all fields "
                            + "necessary to populate object of class [" + this.mappedClass + "]: "
                            + this.mappedProperties);
        }

        return mappedObject;
    }

    /**
     * @param clazz
     * @return
     * @throws BeanInstantiationException
     * @see {@link BeanUtils#instantiateClass(Class)}
     */
    private static Object instantiateClass(Class<?> clazz) throws BeanInstantiationException {
        /*- spring's BeanUtils.instantiateClass()
         Assert.notNull(clazz, "Class must not be null");
        if (clazz.isInterface()) {
            throw new BeanInstantiationException(clazz, "Specified class is an interface");
        }
        try {
            return instantiateClass(clazz.getDeclaredConstructor((Class[]) null), null);
        }
        catch (NoSuchMethodException ex) {
            throw new BeanInstantiationException(clazz, "No default constructor found", ex);
        }*/

        try {
            return clazz.newInstance();
        } catch (Exception ex) {
            throw new BeanInstantiationException(clazz, ex.getMessage(), ex);
        }
    }

}
