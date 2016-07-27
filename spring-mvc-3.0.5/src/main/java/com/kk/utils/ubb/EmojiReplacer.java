package com.kk.utils.ubb;

import org.apache.commons.lang.StringUtils;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 替换emoji的独立类，为了是整体替换逻辑的代码更加简单易懂，容易维护，把emoji的替换独立出来
 * 虽然一定程度上牺牲了效率，但是逻辑却简洁很多，经过测试效率上也没有太大的影响
 * 
 */
public class EmojiReplacer {
	private static Pattern pattern = Pattern.compile("<img class='emoji'.*?>");
	private static final String IMG_ALT = "<img class='emoji' alt='";
	private static final String IMG_SRC = "' src='http://a.xnimg.cn/imgpro/emoji/";
	private static final String IMG_END = ".png' />";
	private static final Set<Character> emojiSet = new HashSet<Character>();

	private static final Map<Character, Integer> unifiedSoftbank = new HashMap<Character, Integer>();
	private static final Map<Character, Integer> numberEmoji = new HashMap<Character, Integer>();

	// 替换四个字节的字符 '\xF0\x9F\x98\x84\xF0\x9F）的解决方案, 如果文本中包含0000 也会过滤掉。
	public static String removeEmojFourChar(String content) {
		byte[] conbyte = content.getBytes(); // 可指定编码
		for (int i = 0; i < conbyte.length; i++) {
			if ((conbyte[i] & 0xF8) == 0xF0) {
				for (int j = 0; j < 4; j++) {
					conbyte[i + j] = 0x30;
				}
				i += 3;
			}
		}
		content = new String(conbyte);
		return content.replaceAll("0000", "");
	}

	/**
	 * 假如带img标签的内容则替换成其中的alt的内容 如将<img alt='\u1234' src='http://www.renren.com'
	 * />替换成\u1234
	 * 
	 * @param content
	 * @return
	 */
	private static String replaceImgToalt(String content) {
		if (StringUtils.isBlank(content)
				|| content.indexOf("<img class='emoji'") < 0) {
			return content;
		}

		Matcher matcher = pattern.matcher(content);
		while (matcher.find()) {
			String imgurl = matcher.group();
			int srcIndex = imgurl.indexOf(" alt='");
			if (srcIndex != -1) {
				imgurl = imgurl.substring(srcIndex + 6);
				imgurl = imgurl.substring(0, imgurl.indexOf('\''));
				content = content.replace(matcher.group(), imgurl);
			}

		}
		return content;
	}

	/**
	 * 转换emoj表情, 转化结果:
	 * 
	 * <img class='emoji' alt='' src='http://a.xnimg.cn/imgpro/emoji/e40e.png'
	 * />
	 * 
	 * @param content
	 * @return
	 */
	public static String replaceEmoji(String content) {
		if (StringUtils.isBlank(content)) {
			return content;
		}
		content = EmojiReplacer.replaceImgToalt(content);

		// char[] charArray = content.toCharArray();
		int length = content.length();
		boolean hasEmoji = false;
		for (int i = 0; i < length; i++) {
			if (emojiSet.contains(content.charAt(i))) {
				hasEmoji = true;
				break;
			} else if (unifiedSoftbank.containsKey(content.charAt(i))) {
				hasEmoji = true;
				break;
			} else if (i < length - 1
					&& numberEmoji.containsKey(content.charAt(i))
					&& content.charAt(i + 1) == 0x20e3) {
				hasEmoji = true;
				break;
			}
		}
		if (hasEmoji) {
			StringBuilder sb = new StringBuilder(300);
			for (int i = 0; i < length; i++) {
				if (emojiSet.contains(content.charAt(i))) {
					sb.append(IMG_ALT);
					sb.append(content.charAt(i));
					sb.append(IMG_SRC);
					sb.append(Integer.toHexString(content.charAt(i)));
					sb.append(IMG_END);
				} else if (unifiedSoftbank.containsKey(content.charAt(i))) {
					sb.append(IMG_ALT);
					sb.append(content.charAt(i));
					sb.append(IMG_SRC);
					sb.append(Integer.toHexString(unifiedSoftbank.get(content
							.charAt(i))));
					sb.append(IMG_END);
				} else if (i < length - 1
						&& numberEmoji.containsKey(content.charAt(i))
						&& content.charAt(i + 1) == 0x20e3) {
					sb.append(IMG_ALT);
					sb.append(content.charAt(i));
					sb.append(content.charAt(i + 1));
					sb.append(IMG_SRC);
					sb.append(Integer.toHexString(numberEmoji.get(content
							.charAt(i))));
					sb.append(IMG_END);
					i = i + 1;
				} else {
					sb.append(content.charAt(i));
				}
			}
			return sb.toString();
		} else {
			return content;
		}

	}

	static {
		emojiSet.add((char) 0xe415);
		emojiSet.add((char) 0xe056);
		emojiSet.add((char) 0xe057);
		emojiSet.add((char) 0xe414);
		emojiSet.add((char) 0xe405);
		emojiSet.add((char) 0xe106);
		emojiSet.add((char) 0xe418);
		emojiSet.add((char) 0xe417);
		emojiSet.add((char) 0xe40d);
		emojiSet.add((char) 0xe40a);
		emojiSet.add((char) 0xe404);
		emojiSet.add((char) 0xe105);
		emojiSet.add((char) 0xe409);
		emojiSet.add((char) 0xe40e);
		emojiSet.add((char) 0xe402);
		emojiSet.add((char) 0xe108);
		emojiSet.add((char) 0xe403);
		emojiSet.add((char) 0xe058);
		emojiSet.add((char) 0xe407);
		emojiSet.add((char) 0xe401);
		emojiSet.add((char) 0xe40f);
		emojiSet.add((char) 0xe40b);
		emojiSet.add((char) 0xe406);
		emojiSet.add((char) 0xe413);
		emojiSet.add((char) 0xe411);
		emojiSet.add((char) 0xe412);
		emojiSet.add((char) 0xe410);
		emojiSet.add((char) 0xe107);
		emojiSet.add((char) 0xe059);
		emojiSet.add((char) 0xe416);
		emojiSet.add((char) 0xe408);
		emojiSet.add((char) 0xe40c);
		emojiSet.add((char) 0xe11a);
		emojiSet.add((char) 0xe10c);
		emojiSet.add((char) 0xe32c);
		emojiSet.add((char) 0xe32a);
		emojiSet.add((char) 0xe32d);
		emojiSet.add((char) 0xe328);
		emojiSet.add((char) 0xe32b);
		emojiSet.add((char) 0xe022);
		emojiSet.add((char) 0xe023);
		emojiSet.add((char) 0xe327);
		emojiSet.add((char) 0xe329);
		emojiSet.add((char) 0xe32e);
		emojiSet.add((char) 0xe32f);
		emojiSet.add((char) 0xe335);
		emojiSet.add((char) 0xe334);
		emojiSet.add((char) 0xe021);
		emojiSet.add((char) 0xe337);
		emojiSet.add((char) 0xe020);
		emojiSet.add((char) 0xe336);
		emojiSet.add((char) 0xe13c);
		emojiSet.add((char) 0xe330);
		emojiSet.add((char) 0xe331);
		emojiSet.add((char) 0xe326);
		emojiSet.add((char) 0xe03e);
		emojiSet.add((char) 0xe11d);
		emojiSet.add((char) 0xe05a);
		emojiSet.add((char) 0xe00e);
		emojiSet.add((char) 0xe421);
		emojiSet.add((char) 0xe420);
		emojiSet.add((char) 0xe00d);
		emojiSet.add((char) 0xe010);
		emojiSet.add((char) 0xe011);
		emojiSet.add((char) 0xe41e);
		emojiSet.add((char) 0xe012);
		emojiSet.add((char) 0xe422);
		emojiSet.add((char) 0xe22e);
		emojiSet.add((char) 0xe22f);
		emojiSet.add((char) 0xe231);
		emojiSet.add((char) 0xe230);
		emojiSet.add((char) 0xe427);
		emojiSet.add((char) 0xe41d);
		emojiSet.add((char) 0xe00f);
		emojiSet.add((char) 0xe41f);
		emojiSet.add((char) 0xe14c);
		emojiSet.add((char) 0xe201);
		emojiSet.add((char) 0xe201);
		emojiSet.add((char) 0xe115);
		emojiSet.add((char) 0xe428);
		emojiSet.add((char) 0xe51f);
		emojiSet.add((char) 0xe429);
		emojiSet.add((char) 0xe424);
		emojiSet.add((char) 0xe423);
		emojiSet.add((char) 0xe253);
		emojiSet.add((char) 0xe426);
		emojiSet.add((char) 0xe111);
		emojiSet.add((char) 0xe425);
		emojiSet.add((char) 0xe31e);
		emojiSet.add((char) 0xe31f);
		emojiSet.add((char) 0xe31d);
		emojiSet.add((char) 0xe001);
		emojiSet.add((char) 0xe002);
		emojiSet.add((char) 0xe005);
		emojiSet.add((char) 0xe004);
		emojiSet.add((char) 0xe51a);
		emojiSet.add((char) 0xe519);
		emojiSet.add((char) 0xe518);
		emojiSet.add((char) 0xe515);
		emojiSet.add((char) 0xe516);
		emojiSet.add((char) 0xe517);
		emojiSet.add((char) 0xe51b);
		emojiSet.add((char) 0xe152);
		emojiSet.add((char) 0xe04e);
		emojiSet.add((char) 0xe51c);
		emojiSet.add((char) 0xe51e);
		emojiSet.add((char) 0xe11c);
		emojiSet.add((char) 0xe536);
		emojiSet.add((char) 0xe003);
		emojiSet.add((char) 0xe41c);
		emojiSet.add((char) 0xe41b);
		emojiSet.add((char) 0xe419);
		emojiSet.add((char) 0xe41a);
		emojiSet.add((char) 0xe04a);
		emojiSet.add((char) 0xe04b);
		emojiSet.add((char) 0xe049);
		emojiSet.add((char) 0xe048);
		emojiSet.add((char) 0xe04c);
		emojiSet.add((char) 0xe13d);
		emojiSet.add((char) 0xe443);
		emojiSet.add((char) 0xe43e);
		emojiSet.add((char) 0xe04f);
		emojiSet.add((char) 0xe052);
		emojiSet.add((char) 0xe053);
		emojiSet.add((char) 0xe524);
		emojiSet.add((char) 0xe52c);
		emojiSet.add((char) 0xe52a);
		emojiSet.add((char) 0xe531);
		emojiSet.add((char) 0xe050);
		emojiSet.add((char) 0xe527);
		emojiSet.add((char) 0xe051);
		emojiSet.add((char) 0xe10b);
		emojiSet.add((char) 0xe52b);
		emojiSet.add((char) 0xe52f);
		emojiSet.add((char) 0xe528);
		emojiSet.add((char) 0xe01a);
		emojiSet.add((char) 0xe134);
		emojiSet.add((char) 0xe530);
		emojiSet.add((char) 0xe529);
		emojiSet.add((char) 0xe526);
		emojiSet.add((char) 0xe52d);
		emojiSet.add((char) 0xe521);
		emojiSet.add((char) 0xe523);
		emojiSet.add((char) 0xe52e);
		emojiSet.add((char) 0xe055);
		emojiSet.add((char) 0xe525);
		emojiSet.add((char) 0xe10a);
		emojiSet.add((char) 0xe109);
		emojiSet.add((char) 0xe522);
		emojiSet.add((char) 0xe019);
		emojiSet.add((char) 0xe054);
		emojiSet.add((char) 0xe520);
		emojiSet.add((char) 0xe306);
		emojiSet.add((char) 0xe030);
		emojiSet.add((char) 0xe304);
		emojiSet.add((char) 0xe110);
		emojiSet.add((char) 0xe032);
		emojiSet.add((char) 0xe305);
		emojiSet.add((char) 0xe303);
		emojiSet.add((char) 0xe118);
		emojiSet.add((char) 0xe447);
		emojiSet.add((char) 0xe119);
		emojiSet.add((char) 0xe307);
		emojiSet.add((char) 0xe308);
		emojiSet.add((char) 0xe444);
		emojiSet.add((char) 0xe441);
		emojiSet.add((char) 0xe036);
		emojiSet.add((char) 0xe157);
		emojiSet.add((char) 0xe038);
		emojiSet.add((char) 0xe153);
		emojiSet.add((char) 0xe155);
		emojiSet.add((char) 0xe14d);
		emojiSet.add((char) 0xe156);
		emojiSet.add((char) 0xe501);
		emojiSet.add((char) 0xe501);
		emojiSet.add((char) 0xe158);
		emojiSet.add((char) 0xe43d);
		emojiSet.add((char) 0xe037);
		emojiSet.add((char) 0xe504);
		emojiSet.add((char) 0xe44a);
		emojiSet.add((char) 0xe146);
		emojiSet.add((char) 0xe50a);
		emojiSet.add((char) 0xe505);
		emojiSet.add((char) 0xe506);
		emojiSet.add((char) 0xe122);
		emojiSet.add((char) 0xe508);
		emojiSet.add((char) 0xe509);
		emojiSet.add((char) 0xe03b);
		emojiSet.add((char) 0xe04d);
		emojiSet.add((char) 0xe449);
		emojiSet.add((char) 0xe44b);
		emojiSet.add((char) 0xe51d);
		emojiSet.add((char) 0xe44c);
		emojiSet.add((char) 0xe124);
		emojiSet.add((char) 0xe121);
		emojiSet.add((char) 0xe433);
		emojiSet.add((char) 0xe202);
		emojiSet.add((char) 0xe135);
		emojiSet.add((char) 0xe01c);
		emojiSet.add((char) 0xe01d);
		emojiSet.add((char) 0xe10d);
		emojiSet.add((char) 0xe136);
		emojiSet.add((char) 0xe42e);
		emojiSet.add((char) 0xe01b);
		emojiSet.add((char) 0xe15a);
		emojiSet.add((char) 0xe159);
		emojiSet.add((char) 0xe432);
		emojiSet.add((char) 0xe430);
		emojiSet.add((char) 0xe431);
		emojiSet.add((char) 0xe42f);
		emojiSet.add((char) 0xe01e);
		emojiSet.add((char) 0xe039);
		emojiSet.add((char) 0xe435);
		emojiSet.add((char) 0xe01f);
		emojiSet.add((char) 0xe125);
		emojiSet.add((char) 0xe03a);
		emojiSet.add((char) 0xe14e);
		emojiSet.add((char) 0xe252);
		emojiSet.add((char) 0xe137);
		emojiSet.add((char) 0xe209);
		emojiSet.add((char) 0xe154);
		emojiSet.add((char) 0xe133);
		emojiSet.add((char) 0xe150);
		emojiSet.add((char) 0xe320);
		emojiSet.add((char) 0xe320);
		emojiSet.add((char) 0xe123);
		emojiSet.add((char) 0xe132);
		emojiSet.add((char) 0xe143);
		emojiSet.add((char) 0xe50b);
		emojiSet.add((char) 0xe514);
		emojiSet.add((char) 0xe513);
		emojiSet.add((char) 0xe50c);
		emojiSet.add((char) 0xe50d);
		emojiSet.add((char) 0xe511);
		emojiSet.add((char) 0xe50f);
		emojiSet.add((char) 0xe512);
		emojiSet.add((char) 0xe510);
		emojiSet.add((char) 0xe50e);
		emojiSet.add((char) 0xe436);
		emojiSet.add((char) 0xe437);
		emojiSet.add((char) 0xe438);
		emojiSet.add((char) 0xe43a);
		emojiSet.add((char) 0xe439);
		emojiSet.add((char) 0xe43b);
		emojiSet.add((char) 0xe117);
		emojiSet.add((char) 0xe440);
		emojiSet.add((char) 0xe442);
		emojiSet.add((char) 0xe446);
		emojiSet.add((char) 0xe445);
		emojiSet.add((char) 0xe11b);
		emojiSet.add((char) 0xe448);
		emojiSet.add((char) 0xe033);
		emojiSet.add((char) 0xe112);
		emojiSet.add((char) 0xe325);
		emojiSet.add((char) 0xe312);
		emojiSet.add((char) 0xe310);
		emojiSet.add((char) 0xe126);
		emojiSet.add((char) 0xe127);
		emojiSet.add((char) 0xe008);
		emojiSet.add((char) 0xe03d);
		emojiSet.add((char) 0xe00c);
		emojiSet.add((char) 0xe12a);
		emojiSet.add((char) 0xe00a);
		emojiSet.add((char) 0xe00b);
		emojiSet.add((char) 0xe009);
		emojiSet.add((char) 0xe316);
		emojiSet.add((char) 0xe129);
		emojiSet.add((char) 0xe141);
		emojiSet.add((char) 0xe142);
		emojiSet.add((char) 0xe317);
		emojiSet.add((char) 0xe128);
		emojiSet.add((char) 0xe14b);
		emojiSet.add((char) 0xe211);
		emojiSet.add((char) 0xe114);
		emojiSet.add((char) 0xe145);
		emojiSet.add((char) 0xe144);
		emojiSet.add((char) 0xe03f);
		emojiSet.add((char) 0xe313);
		emojiSet.add((char) 0xe116);
		emojiSet.add((char) 0xe10f);
		emojiSet.add((char) 0xe104);
		emojiSet.add((char) 0xe103);
		emojiSet.add((char) 0xe101);
		emojiSet.add((char) 0xe102);
		emojiSet.add((char) 0xe13f);
		emojiSet.add((char) 0xe140);
		emojiSet.add((char) 0xe11f);
		emojiSet.add((char) 0xe12f);
		emojiSet.add((char) 0xe031);
		emojiSet.add((char) 0xe30e);
		emojiSet.add((char) 0xe311);
		emojiSet.add((char) 0xe113);
		emojiSet.add((char) 0xe30f);
		emojiSet.add((char) 0xe13b);
		emojiSet.add((char) 0xe42b);
		emojiSet.add((char) 0xe42a);
		emojiSet.add((char) 0xe018);
		emojiSet.add((char) 0xe016);
		emojiSet.add((char) 0xe015);
		emojiSet.add((char) 0xe014);
		emojiSet.add((char) 0xe42c);
		emojiSet.add((char) 0xe42d);
		emojiSet.add((char) 0xe017);
		emojiSet.add((char) 0xe013);
		emojiSet.add((char) 0xe20e);
		emojiSet.add((char) 0xe20c);
		emojiSet.add((char) 0xe20f);
		emojiSet.add((char) 0xe20d);
		emojiSet.add((char) 0xe131);
		emojiSet.add((char) 0xe12b);
		emojiSet.add((char) 0xe130);
		emojiSet.add((char) 0xe12d);
		emojiSet.add((char) 0xe324);
		emojiSet.add((char) 0xe301);
		emojiSet.add((char) 0xe148);
		emojiSet.add((char) 0xe502);
		emojiSet.add((char) 0xe03c);
		emojiSet.add((char) 0xe30a);
		emojiSet.add((char) 0xe042);
		emojiSet.add((char) 0xe040);
		emojiSet.add((char) 0xe041);
		emojiSet.add((char) 0xe12c);
		emojiSet.add((char) 0xe007);
		emojiSet.add((char) 0xe31a);
		emojiSet.add((char) 0xe13e);
		emojiSet.add((char) 0xe31b);
		emojiSet.add((char) 0xe006);
		emojiSet.add((char) 0xe302);
		emojiSet.add((char) 0xe319);
		emojiSet.add((char) 0xe321);
		emojiSet.add((char) 0xe322);
		emojiSet.add((char) 0xe314);
		emojiSet.add((char) 0xe503);
		emojiSet.add((char) 0xe10e);
		emojiSet.add((char) 0xe318);
		emojiSet.add((char) 0xe43c);
		emojiSet.add((char) 0xe11e);
		emojiSet.add((char) 0xe323);
		emojiSet.add((char) 0xe31c);
		emojiSet.add((char) 0xe034);
		emojiSet.add((char) 0xe035);
		emojiSet.add((char) 0xe045);
		emojiSet.add((char) 0xe338);
		emojiSet.add((char) 0xe047);
		emojiSet.add((char) 0xe30c);
		emojiSet.add((char) 0xe044);
		emojiSet.add((char) 0xe30b);
		emojiSet.add((char) 0xe043);
		emojiSet.add((char) 0xe120);
		emojiSet.add((char) 0xe33b);
		emojiSet.add((char) 0xe33f);
		emojiSet.add((char) 0xe341);
		emojiSet.add((char) 0xe34c);
		emojiSet.add((char) 0xe344);
		emojiSet.add((char) 0xe342);
		emojiSet.add((char) 0xe33d);
		emojiSet.add((char) 0xe33e);
		emojiSet.add((char) 0xe340);
		emojiSet.add((char) 0xe34d);
		emojiSet.add((char) 0xe339);
		emojiSet.add((char) 0xe147);
		emojiSet.add((char) 0xe343);
		emojiSet.add((char) 0xe33c);
		emojiSet.add((char) 0xe33a);
		emojiSet.add((char) 0xe43f);
		emojiSet.add((char) 0xe34b);
		emojiSet.add((char) 0xe046);
		emojiSet.add((char) 0xe345);
		emojiSet.add((char) 0xe346);
		emojiSet.add((char) 0xe348);
		emojiSet.add((char) 0xe347);
		emojiSet.add((char) 0xe34a);
		emojiSet.add((char) 0xe349);
		emojiSet.add((char) 0xe21c);
		emojiSet.add((char) 0xe21d);
		emojiSet.add((char) 0xe21e);
		emojiSet.add((char) 0xe21f);
		emojiSet.add((char) 0xe220);
		emojiSet.add((char) 0xe221);
		emojiSet.add((char) 0xe222);
		emojiSet.add((char) 0xe223);
		emojiSet.add((char) 0xe224);
		emojiSet.add((char) 0xe225);
		emojiSet.add((char) 0xe210);
		emojiSet.add((char) 0xe232);
		emojiSet.add((char) 0xe233);
		emojiSet.add((char) 0xe235);
		emojiSet.add((char) 0xe234);
		emojiSet.add((char) 0xe236);
		emojiSet.add((char) 0xe237);
		emojiSet.add((char) 0xe238);
		emojiSet.add((char) 0xe239);
		emojiSet.add((char) 0xe23b);
		emojiSet.add((char) 0xe23a);
		emojiSet.add((char) 0xe23d);
		emojiSet.add((char) 0xe23c);
		emojiSet.add((char) 0xe24d);
		emojiSet.add((char) 0xe212);
		emojiSet.add((char) 0xe24c);
		emojiSet.add((char) 0xe213);
		emojiSet.add((char) 0xe214);
		emojiSet.add((char) 0xe507);
		emojiSet.add((char) 0xe203);
		emojiSet.add((char) 0xe20b);
		emojiSet.add((char) 0xe22a);
		emojiSet.add((char) 0xe22b);
		emojiSet.add((char) 0xe226);
		emojiSet.add((char) 0xe227);
		emojiSet.add((char) 0xe22c);
		emojiSet.add((char) 0xe22d);
		emojiSet.add((char) 0xe215);
		emojiSet.add((char) 0xe216);
		emojiSet.add((char) 0xe217);
		emojiSet.add((char) 0xe218);
		emojiSet.add((char) 0xe228);
		emojiSet.add((char) 0xe151);
		emojiSet.add((char) 0xe138);
		emojiSet.add((char) 0xe139);
		emojiSet.add((char) 0xe13a);
		emojiSet.add((char) 0xe208);
		emojiSet.add((char) 0xe14f);
		emojiSet.add((char) 0xe20a);
		emojiSet.add((char) 0xe434);
		emojiSet.add((char) 0xe309);
		emojiSet.add((char) 0xe315);
		emojiSet.add((char) 0xe30d);
		emojiSet.add((char) 0xe207);
		emojiSet.add((char) 0xe229);
		emojiSet.add((char) 0xe206);
		emojiSet.add((char) 0xe205);
		emojiSet.add((char) 0xe204);
		emojiSet.add((char) 0xe12e);
		emojiSet.add((char) 0xe250);
		emojiSet.add((char) 0xe251);
		emojiSet.add((char) 0xe14a);
		emojiSet.add((char) 0xe149);
		emojiSet.add((char) 0xe23f);
		emojiSet.add((char) 0xe240);
		emojiSet.add((char) 0xe241);
		emojiSet.add((char) 0xe242);
		emojiSet.add((char) 0xe243);
		emojiSet.add((char) 0xe244);
		emojiSet.add((char) 0xe245);
		emojiSet.add((char) 0xe246);
		emojiSet.add((char) 0xe247);
		emojiSet.add((char) 0xe248);
		emojiSet.add((char) 0xe249);
		emojiSet.add((char) 0xe24a);
		emojiSet.add((char) 0xe24b);
		emojiSet.add((char) 0xe23e);
		emojiSet.add((char) 0xe532);
		emojiSet.add((char) 0xe533);
		emojiSet.add((char) 0xe534);
		emojiSet.add((char) 0xe535);
		emojiSet.add((char) 0xe21a);
		emojiSet.add((char) 0xe219);
		emojiSet.add((char) 0xe21b);
		emojiSet.add((char) 0xe02f);
		emojiSet.add((char) 0xe024);
		emojiSet.add((char) 0xe025);
		emojiSet.add((char) 0xe026);
		emojiSet.add((char) 0xe027);
		emojiSet.add((char) 0xe028);
		emojiSet.add((char) 0xe029);
		emojiSet.add((char) 0xe02a);
		emojiSet.add((char) 0xe02b);
		emojiSet.add((char) 0xe02c);
		emojiSet.add((char) 0xe02d);
		emojiSet.add((char) 0xe02e);
		emojiSet.add((char) 0xe332);
		emojiSet.add((char) 0xe333);
		emojiSet.add((char) 0xe24e);
		emojiSet.add((char) 0xe24f);
		emojiSet.add((char) 0xe537);

		unifiedSoftbank.put((char) 0x260E, 0xe009);
		unifiedSoftbank.put((char) 0x261D, 0xe00F);
		unifiedSoftbank.put((char) 0x270A, 0xe010);
		unifiedSoftbank.put((char) 0x270C, 0xe011);
		unifiedSoftbank.put((char) 0x270B, 0xe012);
		unifiedSoftbank.put((char) 0x26F3, 0xe014);
		unifiedSoftbank.put((char) 0x26BE, 0xe016);
		unifiedSoftbank.put((char) 0x26BD, 0xe018);
		unifiedSoftbank.put((char) 0x26F5, 0xe01c);
		unifiedSoftbank.put((char) 0x2708, 0xe01d);
		unifiedSoftbank.put((char) 0x2753, 0xe020);
		unifiedSoftbank.put((char) 0x2757, 0xe021);
		unifiedSoftbank.put((char) 0x2764, 0xe022);
		unifiedSoftbank.put((char) 0x26EA, 0xe037);
		unifiedSoftbank.put((char) 0x26FD, 0xe03a);
		unifiedSoftbank.put((char) 0x2615, 0xe045);
		unifiedSoftbank.put((char) 0x26c4, 0xe048);
		unifiedSoftbank.put((char) 0x2601, 0xe049);
		unifiedSoftbank.put((char) 0x2600, 0xe04a);
		unifiedSoftbank.put((char) 0x2614, 0xe04b);
		unifiedSoftbank.put((char) 0x26f2, 0xe121);
		unifiedSoftbank.put((char) 0x26FA, 0xe122);
		unifiedSoftbank.put((char) 0x2668, 0xe123);
		unifiedSoftbank.put((char) 0x303d, 0xe12c);
		unifiedSoftbank.put((char) 0x26a1, 0xe13d);
		unifiedSoftbank.put((char) 0x2734, 0xe205);
		unifiedSoftbank.put((char) 0x2733, 0xe206);
		unifiedSoftbank.put((char) 0x267f, 0xe20a);
		unifiedSoftbank.put((char) 0x2665, 0xe20c);
		unifiedSoftbank.put((char) 0x2666, 0xe20d);
		unifiedSoftbank.put((char) 0x2660, 0xe20e);
		unifiedSoftbank.put((char) 0x2663, 0xe20f);
		unifiedSoftbank.put((char) 0x27bf, 0xe211);
		unifiedSoftbank.put((char) 0x2b06, 0xe232);
		unifiedSoftbank.put((char) 0x2b07, 0xe233);
		unifiedSoftbank.put((char) 0x27a1, 0xe234);
		unifiedSoftbank.put((char) 0x2B05, 0xe235);
		unifiedSoftbank.put((char) 0x2197, 0xe236);
		unifiedSoftbank.put((char) 0x2196, 0xe237);
		unifiedSoftbank.put((char) 0x2198, 0xe238);
		unifiedSoftbank.put((char) 0x2199, 0xe239);
		unifiedSoftbank.put((char) 0x25b6, 0xe23a);
		unifiedSoftbank.put((char) 0x25c0, 0xe23b);
		unifiedSoftbank.put((char) 0x23e9, 0xe23c);
		unifiedSoftbank.put((char) 0x23ea, 0xe23d);
		unifiedSoftbank.put((char) 0x2648, 0xe23f);
		unifiedSoftbank.put((char) 0x2649, 0xe240);
		unifiedSoftbank.put((char) 0x264a, 0xe241);
		unifiedSoftbank.put((char) 0x264b, 0xe242);
		unifiedSoftbank.put((char) 0x264c, 0xe243);
		unifiedSoftbank.put((char) 0x264d, 0xe244);
		unifiedSoftbank.put((char) 0x264e, 0xe245);
		unifiedSoftbank.put((char) 0x264f, 0xe246);
		unifiedSoftbank.put((char) 0x2650, 0xe247);
		unifiedSoftbank.put((char) 0x2651, 0xe248);
		unifiedSoftbank.put((char) 0x2652, 0xe249);
		unifiedSoftbank.put((char) 0x2653, 0xe24a);
		unifiedSoftbank.put((char) 0x26ce, 0xe24b);
		unifiedSoftbank.put((char) 0x00a9, 0xe24e);
		unifiedSoftbank.put((char) 0x00ae, 0xe24f);
		unifiedSoftbank.put((char) 0x26a0, 0xe252);
		unifiedSoftbank.put((char) 0x3297, 0xe30d);
		unifiedSoftbank.put((char) 0x2702, 0xe313);
		unifiedSoftbank.put((char) 0x3299, 0xe315);
		unifiedSoftbank.put((char) 0x2728, 0xe32e);
		unifiedSoftbank.put((char) 0x2b50, 0xe32f);
		unifiedSoftbank.put((char) 0x2b55, 0xe332);
		unifiedSoftbank.put((char) 0x274c, 0xe333);
		unifiedSoftbank.put((char) 0x2754, 0xe336);
		unifiedSoftbank.put((char) 0x2755, 0xe337);
		unifiedSoftbank.put((char) 0x263a, 0xe414);
		unifiedSoftbank.put((char) 0x2122, 0xe537);

		numberEmoji.put('#', 0xE210);
		numberEmoji.put('1', 0xE21C);
		numberEmoji.put('2', 0xE21D);
		numberEmoji.put('3', 0xE21E);
		numberEmoji.put('4', 0xE21F);
		numberEmoji.put('5', 0xE220);
		numberEmoji.put('6', 0xE221);
		numberEmoji.put('7', 0xE222);
		numberEmoji.put('8', 0xE223);
		numberEmoji.put('9', 0xE224);
		numberEmoji.put('0', 0xE225);

	}

}