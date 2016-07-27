package com.kk.test.service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowCallbackHandler;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.RowMapperResultSetExtractor;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.ParameterizedRowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.transaction.annotation.Transactional;

import com.kk.test.model.TestId;
import com.kk.test.model.User;

public class JDBCUtil {
	public static final Log logger = LogFactory.getLog(JDBCUtil.class);

	private JdbcTemplate jdbc;

	public JdbcTemplate getJdbc() {
		return jdbc;
	}

	public void setJdbc(JdbcTemplate jdbc) {
		this.jdbc = jdbc;
	}

	/** .......................以下是jdbc测试代码................................ */
	/** ...................................................................... */
	class TestIdRowMapper implements RowMapper<TestId> {
		public TestId mapRow(ResultSet rs, int index) throws SQLException {
			TestId u = new TestId(rs.getInt("id"));//可以使用name和index两种方式，index从1开始
			return u;
		}
	}

	/**
	 * 标准的JdbcTemplate 查询list
	 * 
	 * @return
	 */
	public List<TestId> getTestIdList() {
		List<TestId> list = null;
		try {
			String sql = "select id from test";
			list = jdbc.query(sql, new RowMapperResultSetExtractor<TestId>(
					new TestIdRowMapper())); //  第二个参数可以直接传 rowMapper
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		return list;
	}

	/**
	 * 标准的JdbcTemplate select 可以带参数
	 * 
	 * @return
	 */
	public TestId findTestIdNew(int id) {
		String sql = "select id from test where id = ?";
		Object[] params = new Object[] { id };
		int[] types = new int[] { Types.INTEGER };
		List<TestId> list = jdbc.query(sql, params, types,
				new TestIdRowMapper());
		if (list.isEmpty()) {
			return null;
		}
		return list.get(0);
	}

	/**
	 * 标准的JdbcTemplate
	 * 
	 * @return
	 */
	public List<TestId> findTestIdListNew() {
		String sql = "select id from test ";
		List<TestId> list = jdbc.query(sql, new TestIdRowMapper());
		return list;
	}

	/**
	 * 标准的JdbcTemplate select 可以带参数
	 * 
	 * @return
	 */
	public TestId findTestId(int id) {
		String sql = "select id from test where id = ?";
		RowMapper mapper = new RowMapper() {
			public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
				TestId actor = new TestId();
				actor.setId(rs.getInt("id"));
				return actor;
			}
		};
		return (TestId) jdbc.queryForObject(sql, mapper,
				new Object[] { Integer.valueOf(id) });
	}

	/**
	 * SimpleJdbcTemplate select 可以带参数
	 * 
	 * @return
	 */
	public TestId findTestId2(int id) {
		String sql = "select id from test where id = ?";
		ParameterizedRowMapper<TestId> mapper = new ParameterizedRowMapper<TestId>() {
			public TestId mapRow(ResultSet rs, int rowNum) throws SQLException {
				TestId actor = new TestId();
				actor.setId(rs.getInt("id"));
				return actor;
			}
		};
		return jdbc.queryForObject(sql, mapper, id);
	}

	/**
	 * query RowCallbackHandler; 如果不存在则返回 User [id=0, name=null] 不抛出异常
	 */
	public User getTestUser(int id) {
		String sql = "select id ,name from user where id=?";
		final User user = new User();
		jdbc.query(sql, new Object[] { id }, new int[] { Types.INTEGER },
				new RowCallbackHandler() {

					@Override
					public void processRow(ResultSet rs) throws SQLException {
						user.setId(rs.getInt("id"));
						user.setName(rs.getString("name"));
					}
				});
		return user;
	}

	/**
	 * query list RowCallbackHandler; 不存在则返回[] 不抛出异常
	 */
	public List<User> getTestUserList(int id) {
		String sql = "select id ,name from user where id>?";
		final List<User> users = new ArrayList<User>();
		jdbc.query(sql, new Object[] { id }, new int[] { Types.INTEGER },
				new RowCallbackHandler() {

					@Override
					public void processRow(ResultSet rs) throws SQLException {
						User user = new User();
						user.setId(rs.getInt("id"));
						user.setName(rs.getString("name"));
						users.add(user);
					}
				});
		return users;
	}

	/**
	 * 查询的时候RowCallbackHandler和RowMapper区别：
	 * RowMapper一次返回所有结果集，RowCallbackHandler则是在processRow中一个一个处理，
	 * 所以如果list比较小的时候使用RowMapper
	 * ,list比较大的时候使用RowCallbackHandler，直接处理，不添加到list中，以免内存溢出
	 */

	/**
	 * execute执行sql语句 defaultAutoCommit是true是才提交， TODO false时候手动提交一直失败
	 */
	public void testExecute() {
		String sql = "insert into test(id) values(6)";
		jdbc.execute(sql);
		// commit();
	}

	// private void commit() {
	// try {
	// jdbc.getDataSource().getConnection().commit();
	// } catch (SQLException e) {
	// logger.error(e.getMessage(), e);
	// }
	// }

	/**
	 * query 执行查询 返回单行int,string
	 * 
	 * @return
	 */
	public int getTestCount() {
		int count = jdbc.queryForInt("select count(*) from test");
		return count;
	}

	/**
	 * 如果不存在则抛出异常
	 * 
	 * @return
	 */
	public String getTestId() {
		String ret = jdbc.queryForObject("select id from test where id=?",
				String.class, 1);
		try {
			Integer r = jdbc.queryForObject("select id from test where id=?",
					Integer.class, 2);
			int r2 = jdbc.queryForInt("select id from test where id=?", 2);
			logger.info("query for int " + r + ".." + r2);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		return ret;
	}

	/**
	 * query for list
	 * 
	 * @return [{id=1}, {id=2}] 记录是一个Map对象，对应应数据库中某一行；而该Map 中的每一项对应该数据库行中的某一列值
	 */
	public List getTestList() {
		List row = jdbc.queryForList("select id from test");
		return row;
	}

	/**
	 * update 支持接收参数
	 */
	public void updateTestId(int id) {
		String sql = "update test set id=id+10 where id=?";
		jdbc.update(sql, new Object[] { id });
		// jdbc.update(sql, id); //两种方法都可以
	}

	/**
	 * update时候 指定参数type
	 * 
	 * @param id
	 */
	public void testInsert(int id) {
		String sql = "INSERT INTO test(id) VALUES(?)";
		Object[] params = new Object[] { id };
		// int[] types = new int[] { Types.INTEGER, Types.VARCHAR, Types.CHAR,
		// Types.VARCHAR };
		int[] types = new int[] { Types.INTEGER };
		jdbc.update(sql, params, types);
	}

	/**
	 * update ProparedStatement参数 尽量使用update(sql,param[]),代码简洁
	 * 
	 * @param id
	 */
	public void testInsert2(final int id) {
		String sql = "INSERT INTO test(id) VALUES(?)";
		jdbc.update(sql, new PreparedStatementSetter() {
			@Override
			public void setValues(PreparedStatement ps) throws SQLException {
				ps.setInt(1, id);// 参数索引从1开始
			}
		});
	}

	/**
	 * 插入一条数据，获取自增id
	 * 
	 * @return
	 */
	public int testInsertUser(final String name) {
		final String sql = "insert into user(name) values(?)";
		KeyHolder keyHolder = new GeneratedKeyHolder();// 创建一个主键持有者
		jdbc.update(new PreparedStatementCreator() {
			@Override
			public PreparedStatement createPreparedStatement(Connection conn)
					throws SQLException {
				// mysql驱动 Statement.RETURN_GENERATED_KEYS 5.1.7版本后的必须加
				PreparedStatement ps = conn.prepareStatement(sql,
						Statement.RETURN_GENERATED_KEYS);
				ps.setString(1, name);
				return ps;
			}
		}, keyHolder);
		return keyHolder.getKey().intValue();
	}

	/**
	 * 批量更新
	 * 
	 * @return
	 */
	public int[] updateBatchActors(final List<User> actors) {
		int[] updateCounts = jdbc.batchUpdate(
				"insert into user(name) values(?)",
				new BatchPreparedStatementSetter() {

					public int getBatchSize() {
						return actors.size();
					}

					public void setValues(PreparedStatement ps, int i)
							throws SQLException {
						ps.setString(1, actors.get(i).getName());
					}

				});
		return updateCounts;
	}
}