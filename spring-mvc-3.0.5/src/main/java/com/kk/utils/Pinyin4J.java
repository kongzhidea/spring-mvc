package com.kk.utils;

import net.sourceforge.pinyin4j.PinyinHelper;
import net.sourceforge.pinyin4j.format.HanyuPinyinCaseType;
import net.sourceforge.pinyin4j.format.HanyuPinyinOutputFormat;
import net.sourceforge.pinyin4j.format.HanyuPinyinToneType;
import net.sourceforge.pinyin4j.format.HanyuPinyinVCharType;
import net.sourceforge.pinyin4j.format.exception.BadHanyuPinyinOutputFormatCombination;
import org.apache.commons.lang.StringUtils;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class Pinyin4J {

	public static String getStringPinyinSpace(String word) {
		StringBuilder sb = new StringBuilder();
		String[] conts = StringUtils.split(word);
		for (int i = 0; i < conts.length; i++) {
			String cont = conts[i];
			if (i > 0) {
				sb.append(" ");
			}
			sb.append(getStringPinyin(cont));
		}
		return sb.toString();
	}

	private static Map<String, String> PY = new HashMap<String, String>();
	static {
		PY.put("阿", "a");
		PY.put("长", "chang");
		PY.put("传", "chuan");
		PY.put("乐", "le");
		PY.put("系", "xi");
		PY.put("南", "nan");
		PY.put("大", "da");
		PY.put("夏", "xia");
		PY.put("行", "xing");
		PY.put("景", "jing");
		PY.put("哈", "ha");
		PY.put("广", "guang");
		PY.put("卡", "ka");
		PY.put("车", "che");
		PY.put("佛", "fu");
		PY.put("奇", "qi");
		PY.put("兹", "zi");
		PY.put("塔", "ta");
		PY.put("思", "si");
		PY.put("蓝", "lan");
		PY.put("丁", "ding");
		PY.put("鸟", "niao");
		PY.put("敞", "chang");
		PY.put("克", "ke");
		PY.put("劲", "jin");
		PY.put("勒", "le");
		PY.put("广", "guang");
		PY.put("派", "pai");
		PY.put("波", "bo");
		PY.put("甲", "jia");
		PY.put("杉", "shan");
		PY.put("女", "nv");
		PY.put("盛", "sheng");
		PY.put("和", "heyue");
		PY.put("无", "wu");
		PY.put("拓", "tuo");
		PY.put("壳", "ke");
		PY.put("虫", "chong");
		PY.put("家", "jia");
		PY.put("俊", "jun");
		PY.put("石", "shi");
		PY.put(".", ".");
		PY.put("_", "_");
		PY.put("-", "-");
	}

	public static String getStringPinyin(String word) {
		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < word.length(); i++) {
			String s = Character.toString(word.charAt(i));
			if (StringUtils.isNumeric(s)) {
				sb.append(s);
				continue;
			}
			if (PY.containsKey(s)) {
				sb.append(PY.get(s));
				continue;
			}
			Set<String> pys = Pinyin4J.getPinyin(s);
			if (pys != null) {
				for (String py : pys) {
					sb.append(py);
					break;
				}
			}
		}
		return sb.toString();
	}

	/**
	 * 字符串集合转换字符串(逗号分隔)
	 *
	 * @author wyh
	 * @param stringSet
	 * @return
	 */
	public static String makeStringByStringSet(Set<String> stringSet) {
		StringBuilder str = new StringBuilder();
		int i = 0;
		for (String s : stringSet) {
			if (i == stringSet.size() - 1) {
				str.append(s);
			} else {
				str.append(s + ",");
			}
			i++;
		}
		return str.toString().toLowerCase();
	}

	/**
	 * 获取拼音集合
	 *
	 * @author wyh
	 * @param src
	 * @return Set<String>
	 */
	public static Set<String> getPinyin(String src) {
		if (src != null && !src.trim().equalsIgnoreCase("")) {
			char[] srcChar;
			srcChar = src.toCharArray();
			// 汉语拼音格式输出类
			HanyuPinyinOutputFormat hanYuPinOutputFormat = new HanyuPinyinOutputFormat();

			// 输出设置，大小写，音标方式等
			hanYuPinOutputFormat.setCaseType(HanyuPinyinCaseType.LOWERCASE);
			hanYuPinOutputFormat.setToneType(HanyuPinyinToneType.WITHOUT_TONE);
			hanYuPinOutputFormat.setVCharType(HanyuPinyinVCharType.WITH_V);

			String[][] temp = new String[src.length()][];
			for (int i = 0; i < srcChar.length; i++) {
				char c = srcChar[i];
				// 是中文或者a-z或者A-Z转换拼音(我的需求，是保留中文或者a-z或者A-Z)
				if (String.valueOf(c).matches("[\\u4E00-\\u9FA5]+")) {
					try {
						temp[i] = PinyinHelper.toHanyuPinyinStringArray(
								srcChar[i], hanYuPinOutputFormat);
					} catch (BadHanyuPinyinOutputFormatCombination e) {
						e.printStackTrace();
					}
				} else if (((int) c >= 65 && (int) c <= 90)
						|| ((int) c >= 97 && (int) c <= 122)) {
					temp[i] = new String[] { String.valueOf(srcChar[i]) };
				} else {
					temp[i] = new String[] { "" };
				}
			}
			String[] pingyinArray = Exchange(temp);
			Set<String> pinyinSet = new HashSet<String>();
			for (int i = 0; i < pingyinArray.length; i++) {
				pinyinSet.add(pingyinArray[i]);
			}
			return pinyinSet;
		}
		return null;
	}

	/**
	 * 递归
	 *
	 * @author wyh
	 * @param strJaggedArray
	 * @return
	 */
	public static String[] Exchange(String[][] strJaggedArray) {
		String[][] temp = DoExchange(strJaggedArray);
		return temp[0];
	}

	/**
	 * 递归
	 *
	 * @author wyh
	 * @param strJaggedArray
	 * @return
	 */
	private static String[][] DoExchange(String[][] strJaggedArray) {
		int len = strJaggedArray.length;
		if (len >= 2) {
			int len1 = strJaggedArray[0].length;
			int len2 = strJaggedArray[1].length;
			int newlen = len1 * len2;
			String[] temp = new String[newlen];
			int Index = 0;
			for (int i = 0; i < len1; i++) {
				for (int j = 0; j < len2; j++) {
					temp[Index] = strJaggedArray[0][i] + strJaggedArray[1][j];
					Index++;
				}
			}
			String[][] newArray = new String[len - 1][];
			for (int i = 2; i < len; i++) {
				newArray[i - 1] = strJaggedArray[i];
			}
			newArray[0] = temp;
			return DoExchange(newArray);
		} else {
			return strJaggedArray;
		}
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) {
//		String str = "单田芳";
//		System.out.println(makeStringByStringSet(getPinyin(str)));
//		str = "孔智慧";
//		System.out.println(makeStringByStringSet(getPinyin(str)));
//		str = "袁小栋";
//		System.out.println(makeStringByStringSet(getPinyin(str)));
//		str = "袁小锟.Mo.";
//		System.out.println(makeStringByStringSet(getPinyin(str)));
//		str = "徐泼";
//		System.out.println(makeStringByStringSet(getPinyin(str)));
//		str = "任海i啊";
//		System.out.println(makeStringByStringSet(getPinyin(str)));
//		str = "银行";
//		System.out.println(makeStringByStringSet(getPinyin(str)));
	    System.out.println(getStringPinyin("机油"));
	    System.out.println(getStringPinyin("机滤"));
	    System.out.println(getStringPinyin("空气滤清器"));
	    System.out.println(getStringPinyin("空调滤清器"));
	    System.out.println(getStringPinyin("服务"));
	    System.out.println(getStringPinyin("PM2.5 双效空调滤清器"));
	    System.out.println(getStringPinyin("PM2.5单效空调滤清器"));
	    System.out.println(getStringPinyin("玻璃水"));
	    System.out.println(getStringPinyin("电瓶"));
	    System.out.println(getStringPinyin("灯泡"));
	    System.out.println(getStringPinyin("雨刷"));
	    System.out.println(getStringPinyin("防冻液"));
	    System.out.println(getStringPinyin("燃油滤清器"));
	    System.out.println(getStringPinyin("喇叭"));
	    System.out.println(getStringPinyin("其它"));
	    System.out.println(getStringPinyin("服务车辆工具"));
	    System.out.println(getStringPinyin("火花塞"));
	    System.out.println(getStringPinyin("清洗剂"));
	    System.out.println(getStringPinyin("空调杀菌剂"));
	    System.out.println(getStringPinyin("保护剂"));
	    System.out.println(getStringPinyin("特殊配件"));
	    System.out.println(getStringPinyin("润滑剂"));
	    System.out.println(getStringPinyin("自动变速油"));
	    System.out.println(getStringPinyin("手动变速油"));
	    System.out.println(getStringPinyin("螺丝"));
	    System.out.println(getStringPinyin("空调外滤"));
	    System.out.println(getStringPinyin("前刹车片"));
	    System.out.println(getStringPinyin("后刹车片"));
	    System.out.println(getStringPinyin("刹车油"));
	    System.out.println(getStringPinyin("去油膜"));
	    System.out.println(getStringPinyin("镀膜剂"));
	    System.out.println(getStringPinyin("净化液"));
	    System.out.println(getStringPinyin("工时费"));
	}

}
