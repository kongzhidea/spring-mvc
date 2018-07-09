
```
<dependency>
    <groupId>org.aspectj</groupId>
    <artifactId>aspectjweaver</artifactId>
    <version>1.8.9</version>
</dependency>
<dependency>
    <groupId>cglib</groupId>
    <artifactId>cglib-nodep</artifactId>
    <version>2.2.2</version>
</dependency>
```

### service切面日志
* ServiceLogAspect 记录service层日志：参数、返回值、执行时间等参数。
* [@Pointcut的用法](https://blog.csdn.net/qq_15037231/article/details/78159456)


```
其他写法：
// ..*.*(..)) 目录及子目录
@Before("execution(* com.kk.service..*.*(..))")
private void beforeAspect(JoinPoint joinPoint) {
   final MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();
    Method method = methodSignature.getMethod();
}
```

