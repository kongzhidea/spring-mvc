
#### spring-boot 默认使用logback
#### 推荐使用logback来代替log4j

#### 行号的方法等的输出需要获取当前的运行堆栈，在日志量较大的时候会是性能的瓶颈，所以在某些日志(如统计型日志)中，直接去掉行号和方法，以此来提高日志性能。

#### spring-mvc中使用logback
* logback.xml只需要在resources目录下即可，web.xml不需要配置。


#### log用法 
```
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

Logger log = LoggerFactory.getLogger(this.getClass());
// slf4j 可以使用{}作为占位符
```

```
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

private Log logger = LogFactory.getLog(this.getClass());
```

#### logback依赖 
```
 <!-- log4j -->
<dependency>
    <groupId>commons-logging</groupId>
    <artifactId>commons-logging</artifactId>
    <version>1.1.1</version>
</dependency>
<dependency>
    <groupId>log4j</groupId>
    <artifactId>log4j</artifactId>
    <version>1.2.16</version>
</dependency>

<!-- logback -->
<dependency>
    <groupId>ch.qos.logback</groupId>
    <artifactId>logback-classic</artifactId>
    <version>1.2.3</version>
</dependency>
<dependency>
    <groupId>ch.qos.logback</groupId>
    <artifactId>logback-core</artifactId>
    <version>1.2.3</version>
</dependency>
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-api</artifactId>
    <version>1.6.6</version>
</dependency>
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>jcl-over-slf4j</artifactId>
    <version>1.6.6</version>
</dependency>
```

#### log4j依赖
```
<!-- log4j -->
<dependency>
    <groupId>commons-logging</groupId>
    <artifactId>commons-logging</artifactId>
    <version>1.1.1</version>
</dependency>
<dependency>
    <groupId>log4j</groupId>
    <artifactId>log4j</artifactId>
    <version>1.2.16</version>
</dependency>

<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-api</artifactId>
    <version>1.6.6</version>
</dependency>
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-log4j12</artifactId>
    <version>1.6.6</version>
</dependency>
```

#### log4j2 动态生成logger，不依赖配置文件，推荐中间件使用，打印日志到统一的目录。
* [log4j2 不使用配置文件，动态生成logger对象](https://www.cnblogs.com/0201zcr/p/5726072.html)
```
<!-- log4j2，用于动态生成logger，使用时候业务方需要自行引入响应版本 -->
<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-api</artifactId>
    <version>2.3</version>
</dependency>
<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-core</artifactId>
    <version>2.3</version>
</dependency>

参考 operator_log.DLogFactory
```
