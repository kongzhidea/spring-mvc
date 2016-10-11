package com.kk.utils;

import java.util.List;
import java.util.Random;

public class RandomUtil {

	private static final char[] DIGITS = { '0', '1', '2', '3', '4', '5', '6',
			'7', '8', '9' };

	private static final char[] DIGITS_HEX = { '0', '1', '2', '3', '4', '5',
			'6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f' };

	private static final char[] ALPHA = { 'a', 'b', 'c', 'd', 'e', 'f', 'g',
			'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
			'u', 'v', 'w', 'x', 'y', 'z' };

	private static final char[] COUPON = { 'a', 'c', 'd', 'e', 'f', 'g', 'h',
			'j', 'k', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
			'y', '0', '1', '2', '3', '5', '6', '7', '8', '9', '0', '1', '2',
			'3', '4', '5', '6', '7', '8', '9', '0', '1', '2', '3', '5', '6',
			'7', '8', '9', '0', '1', '2', '3', '5', '6', '7', '8', '9', '0',
			'1', '2', '3', '5', '6', '7', '8', '9' };

	private static final char[] SPECIAL = { '+', '-', '*', '/', '!', '@', '#',
			'$', '%', '^','|' };

	/**
	 * 返回一个随机的字符串，特殊字符
	 *
	 * @param len
	 * @return
	 */
	public static String nextSEPCIAL(int len) {
		if (len == 0) {
			return "";
		}
		Random random = new Random();
		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < len; i++) {
			sb.append(ALPHA[random.nextInt(ALPHA.length)]);
		}
		return sb.toString();
	}

	/**
	 * 返回一个随机的字符串，纯小写字母
	 * 
	 * @param len
	 * @return
	 */
	public static String nextALPHA(int len) {
		if (len == 0) {
			return "";
		}
		Random random = new Random();
		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < len; i++) {
			sb.append(ALPHA[random.nextInt(ALPHA.length)]);
		}
		return sb.toString();
	}

	/**
	 * 返回一个随机的字符串,0-9a-f
	 * 
	 * @param len
	 * @return
	 */
	public static String nextDIGITS_HEX(int len) {
		if (len == 0) {
			return "";
		}
		Random random = new Random();
		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < len; i++) {
			sb.append(DIGITS_HEX[random.nextInt(DIGITS_HEX.length)]);
		}
		return sb.toString();
	}

	/**
	 * 返回一个随机的字符串,0-9
	 * 
	 * @param len
	 * @return
	 */
	public static String nextDIGITS(int len) {
		if (len == 0) {
			return "";
		}
		Random random = new Random();
		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < len; i++) {
			sb.append(DIGITS[random.nextInt(DIGITS.length)]);
		}
		return sb.toString();
	}

	/**
	 * 返回一个随机的字符串,0-9,a-z，去除了几个字母
	 * 
	 * @param len
	 * @return
	 */
	public static String nextCOUPON(int len) {
		if (len == 0) {
			return "";
		}
		Random random = new Random();
		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < len; i++) {
			sb.append(COUPON[random.nextInt(COUPON.length)]);
		}
		return sb.toString();
	}

	public static <K> K random(List<K> list) {
		Random random = new Random();
		return list.get(random.nextInt(list.size()));
	}

}
