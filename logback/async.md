
### logback 异步日志
```
    <appender name="asyncConsole" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <Pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{36} -%msg%n</Pattern>
            <charset>UTF-8</charset>
        </encoder>
    </appender>

    <!-- 异步log -->
    <appender name="asyncAppender" class="ch.qos.logback.classic.AsyncAppender">
        <!-- 不丢失日志.默认的,如果队列的80%已满,则会丢弃TRACT、DEBUG、INFO级别的日志 -->
        <discardingThreshold >0</discardingThreshold>
        <!-- 更改默认的队列的深度,该值会影响性能.默认值为256 -->
        <queueSize>512</queueSize>
        <!-- 当队列满时候，true表示直接丢弃消息，false表示block当前线程，等待队列不满。 默认false。 -->
        <neverBlock>true</neverBlock>
        <!-- 添加附加的appender,最多只能添加一个 -->
        <appender-ref ref="asyncConsole"/>
    </appender>

    <logger name="asyncLogger" level="info" additivity="false">
        <appender-ref ref="asyncAppender"/>
    </logger>


用法：
Logger logger = LoggerFactory.getLogger("asyncLogger");


注意点：
1. 异步打log,重启机器后，log信息会丢失
2. 如果配置的是异步按天日志，在0点的时候 如果有卡顿，则可能是：AsyncAppenderBase.append()方法，删除过期日志的时候，1.1.7之前的版本不会异步做，新版本1.1.7及其以后版本修正此bug。
```
