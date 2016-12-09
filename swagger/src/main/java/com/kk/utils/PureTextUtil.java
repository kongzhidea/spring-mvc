package com.kk.utils;


import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PureTextUtil {

    /**
     * 过滤 文本中的 script
     * @param content
     * @return
     */
    public static String filterScript(String content) {
        if (content == null) {
            return null;
        }
        String reg = "<[\\s]*?script[^>]*?>[\\s\\S]*?<[\\s]*?\\/[\\s]*?script[\\s]*?>";
        Pattern p_script = Pattern.compile(reg, Pattern.CASE_INSENSITIVE);
        Matcher m_script = p_script.matcher(content);
        content = m_script.replaceAll(""); // 过滤script标签

        reg = "<[\\sa-zA-z]*?script[^>]*?>";
        p_script = Pattern.compile(reg, Pattern.CASE_INSENSITIVE);
        m_script = p_script.matcher(content);
        content = m_script.replaceAll(""); // 过滤script标签

        content = content.replace("<","");
        content = content.replace(">","");
        return content;
    }
}