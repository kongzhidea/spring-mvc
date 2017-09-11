### spring-jdbc-template

```
jdbc-template 用法样例见：JDBCTemplateTest

可以使用封装方法:queryForObject， 传 Integer.class等，返回int类型。

返回自定义bean：
	1. 自定义 RowMapper ， 如UserRowMapper
    2. 通用 数据库字段转bean，如TemplateRowMapper，（SimpleTemplateRowMapper为其简化版，需要类型完全一致，不推荐使用）
    3. 通过 数据库字段转bean，内置：BeanPropertyRowMapper
```
