package com.kk.utils.ubb;

import java.io.UnsupportedEncodingException;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.nio.charset.Charset;
import java.util.*;

public class Emoj4byte2Char {

    private static Map<Emoj4byte, Character> map = new HashMap<Emoj4byte, Character>();

    public static String convert(String content) {
        List<Byte> byteList = new ArrayList<Byte>();
        byte[] conbyte = new byte[0];
        try {
            conbyte = content.getBytes("utf-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            return content;
        }
        for (int i = 0; i < conbyte.length; i++) {
            int deta = 0;
            if (conbyte[i] == (byte) 0xF0) { // 4位
                deta = 3;
            } else if (conbyte[i] == (byte) 0xE2) { //  3位
                deta = 2;
            } else if (conbyte[i] == (byte) 0x23) { //  4位  数字
                deta = 3;
            } else if (conbyte[i] >= (byte) 0x30 && conbyte[i] <= (byte) 0x39) { //  4位  数字
                deta = 3;
            }
            if (deta > 0) {
                Emoj4byte ej4 = null;
                if (deta == 3) {
                    ej4 = new Emoj4byte(conbyte[i], conbyte[i + 1], conbyte[i + 2], conbyte[i + 3]);
                } else {
                    ej4 = new Emoj4byte(conbyte[i], conbyte[i + 1], conbyte[i + 2]);
                }
                if (map.get(ej4) != null) {
                    byte[] l = getBytes(map.get(ej4));
                    byteList.addAll(array2list(l));
                    i += deta;
                } else {
                    byteList.add(Byte.valueOf(conbyte[i]));
                }
            } else {
                byteList.add(Byte.valueOf(conbyte[i]));
            }
        }
        byte[] ret = list2array(byteList);
        return new String(ret);
    }

    private static Character convert(byte[] bytes) {
        return map.get(new Emoj4byte(bytes));
    }

    private static List<Byte> array2list(byte[] bytes) {
        List<Byte> list = new ArrayList<Byte>();
        for (int i = 0; i < bytes.length; i++) {
            list.add(bytes[i]);
        }
        return list;
    }

    private static byte[] list2array(List<Byte> list) {
        byte[] ret = new byte[list.size()];
        for (int i = 0; i < list.size(); i++) {
            ret[i] = list.get(i);
        }
        return ret;
    }

    private static byte[] getBytes(char ch) {
        char[] chars = new char[]{ch};
        Charset cs = Charset.forName("UTF-8");
        CharBuffer cb = CharBuffer.allocate(chars.length);
        cb.put(chars);
        cb.flip();
        ByteBuffer bb = cs.encode(cb);

        return bb.array();

    }


    static {
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x98, (byte) 0x84), (char) 0xE415);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x98, (byte) 0x8A), (char) 0xE056);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x98, (byte) 0x83), (char) 0xE057);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x98, (byte) 0xBA), (char) 0xE414);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x98, (byte) 0x89), (char) 0xE405);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x98, (byte) 0x8D), (char) 0xE106);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x98, (byte) 0x98), (char) 0xE418);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x98, (byte) 0x9A), (char) 0xE417);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x98, (byte) 0xB3), (char) 0xE40D);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x98, (byte) 0x8C), (char) 0xE40A);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x98, (byte) 0x81), (char) 0xE404);

        // 有一些没有设置，只能遇到再补充了，
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x98, (byte) 0x99), (char) 0xE417);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x98, (byte) 0x97), (char) 0xE417);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x98, (byte) 0x80), (char) 0xE057);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x98, (byte) 0x9B), (char) 0xE409);
        // ..end

        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x98, (byte) 0x9C), (char) 0xE105);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x98, (byte) 0x9D), (char) 0xE409);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x98, (byte) 0x92), (char) 0xE40E);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x98, (byte) 0x8F), (char) 0xE402);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x98, (byte) 0x93), (char) 0xE108);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x98, (byte) 0x94), (char) 0xE403);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x98, (byte) 0x9E), (char) 0xE058);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x98, (byte) 0x96), (char) 0xE407);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x98, (byte) 0xA5), (char) 0xE401);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x98, (byte) 0xB0), (char) 0xE40F);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x98, (byte) 0xA8), (char) 0xE40B);

        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x98, (byte) 0xA3), (char) 0xE406);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x98, (byte) 0xA2), (char) 0xE413);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x98, (byte) 0xAD), (char) 0xE411);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x98, (byte) 0x82), (char) 0xE412);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x98, (byte) 0xB2), (char) 0xE410);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x98, (byte) 0xB1), (char) 0xE107);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x98, (byte) 0xA0), (char) 0xE059);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x98, (byte) 0xA1), (char) 0xE416);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x98, (byte) 0xAA), (char) 0xE408);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x98, (byte) 0xB7), (char) 0xE40C);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x91, (byte) 0xBF), (char) 0xE11A);


        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x91, (byte) 0xBD), (char) 0xE10C);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x92, (byte) 0x9B), (char) 0xE32C);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x92, (byte) 0x99), (char) 0xE32A);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x92, (byte) 0x9C), (char) 0xE32D);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x92, (byte) 0x97), (char) 0xE328);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x92, (byte) 0x9A), (char) 0xE32B);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x9D, (byte) 0xA4), (char) 0xE022);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x92, (byte) 0x94), (char) 0xE023);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x92, (byte) 0x93), (char) 0xE327);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x92, (byte) 0x98), (char) 0xE329);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x9C, (byte) 0xA8), (char) 0xE32E);


        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8C, (byte) 0x9F), (char) 0xE335);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x92, (byte) 0xA2), (char) 0xE334);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x9D, (byte) 0x95), (char) 0xE337);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x9D, (byte) 0x94), (char) 0xE336);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x92, (byte) 0xA4), (char) 0xE13C);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x92, (byte) 0xA8), (char) 0xE330);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x92, (byte) 0xA6), (char) 0xE331);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8E, (byte) 0xB6), (char) 0xE326);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8E, (byte) 0xB5), (char) 0xE03E);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x94, (byte) 0xA5), (char) 0xE11D);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x92, (byte) 0xA9), (char) 0xE05A);


        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x91, (byte) 0x8D), (char) 0xE00E);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x91, (byte) 0x8E), (char) 0xE421);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x91, (byte) 0x8C), (char) 0xE420);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x91, (byte) 0x8A), (char) 0xE00D);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x9C, (byte) 0x8A), (char) 0xE010);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x9C, (byte) 0x8C), (char) 0xE011);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x91, (byte) 0x8B), (char) 0xE41E);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x9C, (byte) 0x8B), (char) 0xE012);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x91, (byte) 0x90), (char) 0xE422);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x91, (byte) 0x86), (char) 0xE22E);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x91, (byte) 0x87), (char) 0xE22F);


        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x91, (byte) 0x89), (char) 0xE231);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x91, (byte) 0x88), (char) 0xE230);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x99, (byte) 0x8C), (char) 0xE427);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x99, (byte) 0x8F), (char) 0xE41D);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x98, (byte) 0x9D), (char) 0xE00F);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x91, (byte) 0x8F), (char) 0xE41F);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x92, (byte) 0xAA), (char) 0xE14C);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x9A, (byte) 0xB6), (char) 0xE201);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8F, (byte) 0x83), (char) 0xE115);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x91, (byte) 0xAB), (char) 0xE428);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x92, (byte) 0x83), (char) 0xE51F);


        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x91, (byte) 0xAF), (char) 0xE429);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x99, (byte) 0x86), (char) 0xE424);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x99, (byte) 0x85), (char) 0xE423);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x92, (byte) 0x81), (char) 0xE253);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x99, (byte) 0x87), (char) 0xE426);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x92, (byte) 0x8F), (char) 0xE111);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x92, (byte) 0x91), (char) 0xE425);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x92, (byte) 0x86), (char) 0xE31E);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x92, (byte) 0x87), (char) 0xE31F);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x92, (byte) 0x85), (char) 0xE31D);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x91, (byte) 0xA6), (char) 0xE001);


        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x91, (byte) 0xA7), (char) 0xE002);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x91, (byte) 0xA9), (char) 0xE005);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x91, (byte) 0xA8), (char) 0xE004);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x91, (byte) 0xB6), (char) 0xE51A);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x91, (byte) 0xB5), (char) 0xE519);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x91, (byte) 0xB4), (char) 0xE518);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x91, (byte) 0xB1), (char) 0xE515);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x91, (byte) 0xB2), (char) 0xE516);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x91, (byte) 0xB3), (char) 0xE517);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x91, (byte) 0xB7), (char) 0xE51B);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x91, (byte) 0xAE), (char) 0xE152);


        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x91, (byte) 0xBC), (char) 0xE04E);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x91, (byte) 0xB8), (char) 0xE51C);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x92, (byte) 0x82), (char) 0xE51E);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x92, (byte) 0x80), (char) 0xE11C);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x91, (byte) 0xA3), (char) 0xE536);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x92, (byte) 0x8B), (char) 0xE003);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x91, (byte) 0x84), (char) 0xE41C);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x91, (byte) 0x82), (char) 0xE41B);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x91, (byte) 0x80), (char) 0xE419);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x91, (byte) 0x83), (char) 0xE41A);

        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x98, (byte) 0x80), (char) 0xE04A);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x98, (byte) 0x94), (char) 0xE04B);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x98, (byte) 0x81), (char) 0xE049);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x9B, (byte) 0x84), (char) 0xE048);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8C, (byte) 0x99), (char) 0xE04C);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x9A, (byte) 0xA1), (char) 0xE13D);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8C, (byte) 0x80), (char) 0xE443);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8C, (byte) 0x8A), (char) 0xE43E);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x90, (byte) 0xB1), (char) 0xE04F);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x90, (byte) 0xB6), (char) 0xE052);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x90, (byte) 0xAD), (char) 0xE053);


        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x90, (byte) 0xB9), (char) 0xE524);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x90, (byte) 0xB0), (char) 0xE52C);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x90, (byte) 0xBA), (char) 0xE52A);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x90, (byte) 0xB8), (char) 0xE531);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x90, (byte) 0xAF), (char) 0xE050);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x90, (byte) 0xA8), (char) 0xE527);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x90, (byte) 0xBB), (char) 0xE051);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x90, (byte) 0xB7), (char) 0xE10B);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x90, (byte) 0xAE), (char) 0xE52B);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x90, (byte) 0x97), (char) 0xE52F);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x90, (byte) 0xB5), (char) 0xE109);

        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x90, (byte) 0x92), (char) 0xE528);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x90, (byte) 0xB4), (char) 0xE01A);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x90, (byte) 0x8E), (char) 0xE134);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x90, (byte) 0xAB), (char) 0xE530);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x90, (byte) 0x91), (char) 0xE529);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x90, (byte) 0x98), (char) 0xE526);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x90, (byte) 0x8D), (char) 0xE52D);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x90, (byte) 0xA6), (char) 0xE521);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x90, (byte) 0xA4), (char) 0xE523);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x90, (byte) 0x94), (char) 0xE52E);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x90, (byte) 0xA7), (char) 0xE055);

        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x90, (byte) 0x9B), (char) 0xE525);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x90, (byte) 0x99), (char) 0xE10A);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x90, (byte) 0xA0), (char) 0xE522);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x90, (byte) 0x9F), (char) 0xE019);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x90, (byte) 0xB3), (char) 0xE054);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x90, (byte) 0xAC), (char) 0xE520);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x92, (byte) 0x90), (char) 0xE306);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8C, (byte) 0xB8), (char) 0xE030);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8C, (byte) 0xB7), (char) 0xE304);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8D, (byte) 0x80), (char) 0xE110);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8C, (byte) 0xB9), (char) 0xE032);

        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8C, (byte) 0xBB), (char) 0xE305);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8C, (byte) 0xBA), (char) 0xE303);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8D, (byte) 0x81), (char) 0xE118);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8D, (byte) 0x83), (char) 0xE447);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8D, (byte) 0x82), (char) 0xE119);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8C, (byte) 0xB4), (char) 0xE307);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8C, (byte) 0xB5), (char) 0xE308);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8C, (byte) 0xBE), (char) 0xE444);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x90, (byte) 0x9A), (char) 0xE441);


        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8E, (byte) 0x8D), (char) 0xE436);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x92, (byte) 0x9D), (char) 0xE437);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8E, (byte) 0x8E), (char) 0xE438);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8E, (byte) 0x92), (char) 0xE43A);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8E, (byte) 0x93), (char) 0xE439);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8E, (byte) 0x8F), (char) 0xE43B);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8E, (byte) 0x86), (char) 0xE117);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8E, (byte) 0x87), (char) 0xE440);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8E, (byte) 0x90), (char) 0xE442);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8E, (byte) 0x91), (char) 0xE446);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8E, (byte) 0x83), (char) 0xE445);


        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x91, (byte) 0xBB), (char) 0xE11B);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8E, (byte) 0x85), (char) 0xE448);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8E, (byte) 0x84), (char) 0xE033);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8E, (byte) 0x81), (char) 0xE112);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x94, (byte) 0x94), (char) 0xE325);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8E, (byte) 0x89), (char) 0xE312);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8E, (byte) 0x88), (char) 0xE310);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x92, (byte) 0xBF), (char) 0xE126);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x93, (byte) 0x80), (char) 0xE127);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x93, (byte) 0xB7), (char) 0xE008);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8E, (byte) 0xA5), (char) 0xE03D);


        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x92, (byte) 0xBB), (char) 0xE00C);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x93, (byte) 0xBA), (char) 0xE12A);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x93, (byte) 0xB1), (char) 0xE00A);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x93, (byte) 0xA0), (char) 0xE00B);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x98, (byte) 0x8E), (char) 0xE009);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x92, (byte) 0xBD), (char) 0xE316);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x93, (byte) 0xBC), (char) 0xE129);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x94, (byte) 0x8A), (char) 0xE141);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x93, (byte) 0xA2), (char) 0xE142);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x93, (byte) 0xA3), (char) 0xE317);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x93, (byte) 0xBB), (char) 0xE128);


        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x93, (byte) 0xA1), (char) 0xE14B);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x9E, (byte) 0xBF), (char) 0xE211);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x94, (byte) 0x8D), (char) 0xE114);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x94, (byte) 0x93), (char) 0xE145);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x94, (byte) 0x92), (char) 0xE144);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x94, (byte) 0x91), (char) 0xE03F);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x9C, (byte) 0x82), (char) 0xE313);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x94, (byte) 0xA8), (char) 0xE116);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x92, (byte) 0xA1), (char) 0xE10F);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x93, (byte) 0xB2), (char) 0xE104);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x93, (byte) 0xA9), (char) 0xE103);


        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x93, (byte) 0xAB), (char) 0xE101);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x93, (byte) 0xAE), (char) 0xE102);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x9B, (byte) 0x80), (char) 0xE13F);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x9A, (byte) 0xBD), (char) 0xE140);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x92, (byte) 0xBA), (char) 0xE11F);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x92, (byte) 0xB0), (char) 0xE12F);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x94, (byte) 0xB1), (char) 0xE031);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x9A, (byte) 0xAC), (char) 0xE30E);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x92, (byte) 0xA3), (char) 0xE311);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x94, (byte) 0xAB), (char) 0xE113);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x92, (byte) 0x8A), (char) 0xE30F);


        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x92, (byte) 0x89), (char) 0xE13B);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8F, (byte) 0x88), (char) 0xE42B);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8F, (byte) 0x80), (char) 0xE42A);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x9A, (byte) 0xBD), (char) 0xE018);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x9A, (byte) 0xBE), (char) 0xE016);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8E, (byte) 0xBE), (char) 0xE015);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x9B, (byte) 0xB3), (char) 0xE014);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8E, (byte) 0xB1), (char) 0xE42C);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8F, (byte) 0x8A), (char) 0xE42D);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8F, (byte) 0x84), (char) 0xE017);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8E, (byte) 0xBF), (char) 0xE013);//


        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x99, (byte) 0xA0), (char) 0xE20E);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x99, (byte) 0xA5), (char) 0xE20C);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x99, (byte) 0xA3), (char) 0xE20F);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x99, (byte) 0xA6), (char) 0xE20D);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8F, (byte) 0x86), (char) 0xE131);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x91, (byte) 0xBE), (char) 0xE12B);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8E, (byte) 0xAF), (char) 0xE130);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x80, (byte) 0x84), (char) 0xE12D);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8E, (byte) 0xAC), (char) 0xE324);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x93, (byte) 0x9D), (char) 0xE301);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x93, (byte) 0x96), (char) 0xE148);


        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8E, (byte) 0xA8), (char) 0xE502);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8E, (byte) 0xA4), (char) 0xE03C);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8E, (byte) 0xA7), (char) 0xE30A);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8E, (byte) 0xBA), (char) 0xE042);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8E, (byte) 0xB7), (char) 0xE040);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8E, (byte) 0xB8), (char) 0xE041);
        map.put(new Emoj4byte((byte) 0xE3, (byte) 0x80, (byte) 0xBD), (char) 0xE12C);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x91, (byte) 0x9F), (char) 0xE007);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x91, (byte) 0xA1), (char) 0xE31A);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x91, (byte) 0xA0), (char) 0xE13E);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x91, (byte) 0xA2), (char) 0xE31B);

        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x91, (byte) 0x95), (char) 0xE006);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x91, (byte) 0x94), (char) 0xE302);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x91, (byte) 0x97), (char) 0xE319);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x91, (byte) 0x98), (char) 0xE321);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x91, (byte) 0x99), (char) 0xE322);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8E, (byte) 0x80), (char) 0xE314);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8E, (byte) 0xA9), (char) 0xE503);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x91, (byte) 0x91), (char) 0xE10E);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x91, (byte) 0x92), (char) 0xE318);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8C, (byte) 0x82), (char) 0xE43C);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x92, (byte) 0xBC), (char) 0xE11E);

        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x91, (byte) 0x9C), (char) 0xE323);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x92, (byte) 0x84), (char) 0xE31C);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x92, (byte) 0x8D), (char) 0xE034);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x92, (byte) 0x8E), (char) 0xE035);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x98, (byte) 0x95), (char) 0xE045);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8D, (byte) 0xB5), (char) 0xE338);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8D, (byte) 0xBA), (char) 0xE047);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8D, (byte) 0xBB), (char) 0xE30C);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8D, (byte) 0xB8), (char) 0xE044);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8D, (byte) 0xB6), (char) 0xE30B);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8D, (byte) 0xB4), (char) 0xE043);


        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8D, (byte) 0x94), (char) 0xE120);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8D, (byte) 0x9F), (char) 0xE33B);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8D, (byte) 0x9D), (char) 0xE33F);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8D, (byte) 0x9B), (char) 0xE341);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8D, (byte) 0xB1), (char) 0xE34C);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8D, (byte) 0xA3), (char) 0xE344);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8D, (byte) 0x99), (char) 0xE342);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8D, (byte) 0x98), (char) 0xE33D);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8D, (byte) 0x9A), (char) 0xE33E);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8D, (byte) 0x9C), (char) 0xE340);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8D, (byte) 0xB2), (char) 0xE34D);


        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8D, (byte) 0x9E), (char) 0xE339);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8D, (byte) 0xB3), (char) 0xE147);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8D, (byte) 0xA2), (char) 0xE343);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8D, (byte) 0xA1), (char) 0xE33C);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8D, (byte) 0xA6), (char) 0xE33A);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8D, (byte) 0xA7), (char) 0xE43F);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8E, (byte) 0x82), (char) 0xE34B);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8D, (byte) 0xB0), (char) 0xE046);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8D, (byte) 0x8E), (char) 0xE345);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8D, (byte) 0x8A), (char) 0xE346);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8D, (byte) 0x89), (char) 0xE348);


        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8D, (byte) 0x93), (char) 0xE347);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8D, (byte) 0x86), (char) 0xE34A);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8D, (byte) 0x85), (char) 0xE349);

        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8F, (byte) 0xA0), (char) 0xE036);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8F, (byte) 0xAB), (char) 0xE157);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8F, (byte) 0xA2), (char) 0xE038);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8F, (byte) 0xA3), (char) 0xE153);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8F, (byte) 0xA5), (char) 0xE155);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8F, (byte) 0xA6), (char) 0xE14D);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8F, (byte) 0xAA), (char) 0xE156);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8F, (byte) 0xA9), (char) 0xE501);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8F, (byte) 0xA8), (char) 0xE158);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x92, (byte) 0x92), (char) 0xE43D);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x9B, (byte) 0xAA), (char) 0xE037);

        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8F, (byte) 0xAC), (char) 0xE504);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8C, (byte) 0x87), (char) 0xE44A);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8C, (byte) 0x86), (char) 0xE146);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8F, (byte) 0xA7), (char) 0xE154);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8F, (byte) 0xAF), (char) 0xE505);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8F, (byte) 0xB0), (char) 0xE506);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x9B, (byte) 0xBA), (char) 0xE122);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8F, (byte) 0xAD), (char) 0xE508);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x97, (byte) 0xBC), (char) 0xE509);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x97, (byte) 0xBB), (char) 0xE03B);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8C, (byte) 0x84), (char) 0xE04D);


        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8C, (byte) 0x85), (char) 0xE449);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8C, (byte) 0x83), (char) 0xE44B);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x97, (byte) 0xBD), (char) 0xE51D);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8C, (byte) 0x88), (char) 0xE44C);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8E, (byte) 0xA1), (char) 0xE124);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x9B, (byte) 0xB2), (char) 0xE121);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8E, (byte) 0xA2), (char) 0xE433);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x9A, (byte) 0xA2), (char) 0xE202);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x9A, (byte) 0xA4), (char) 0xE135);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x9B, (byte) 0xB5), (char) 0xE01C);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x9C, (byte) 0x88), (char) 0xE01D);


        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x9A, (byte) 0x80), (char) 0xE10D);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x9A, (byte) 0xB2), (char) 0xE136);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x9A, (byte) 0x99), (char) 0xE42E);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x9A, (byte) 0x97), (char) 0xE01B);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x9A, (byte) 0x95), (char) 0xE15A);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x9A, (byte) 0x8C), (char) 0xE159);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x9A, (byte) 0x93), (char) 0xE432);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x9A, (byte) 0x92), (char) 0xE430);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x9A, (byte) 0x91), (char) 0xE431);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x9A, (byte) 0x9A), (char) 0xE42F);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x9A, (byte) 0x83), (char) 0xE01E);


        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x9A, (byte) 0x89), (char) 0xE039);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x9A, (byte) 0x84), (char) 0xE435);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x9A, (byte) 0x85), (char) 0xE01F);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8E, (byte) 0xAB), (char) 0xE125);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x9B, (byte) 0xBD), (char) 0xE03A);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x9A, (byte) 0xA5), (char) 0xE14E);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x9A, (byte) 0xA0), (char) 0xE252);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x9A, (byte) 0xA7), (char) 0xE137);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x94, (byte) 0xB0), (char) 0xE209);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8E, (byte) 0xB0), (char) 0xE133);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x9A, (byte) 0x8F), (char) 0xE150);


        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x92, (byte) 0x88), (char) 0xE320);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x99, (byte) 0xA8), (char) 0xE123);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8F, (byte) 0x81), (char) 0xE132);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8E, (byte) 0x8C), (char) 0xE143);


        map.put(new Emoj4byte((byte) 0x31, (byte) 0xE2, (byte) 0x83, (byte) 0xA3), (char) 0xE21C);
        map.put(new Emoj4byte((byte) 0x32, (byte) 0xE2, (byte) 0x83, (byte) 0xA3), (char) 0xE21D);
        map.put(new Emoj4byte((byte) 0x33, (byte) 0xE2, (byte) 0x83, (byte) 0xA3), (char) 0xE21E);
        map.put(new Emoj4byte((byte) 0x34, (byte) 0xE2, (byte) 0x83, (byte) 0xA3), (char) 0xE21F);
        map.put(new Emoj4byte((byte) 0x35, (byte) 0xE2, (byte) 0x83, (byte) 0xA3), (char) 0xE220);
        map.put(new Emoj4byte((byte) 0x36, (byte) 0xE2, (byte) 0x83, (byte) 0xA3), (char) 0xE221);
        map.put(new Emoj4byte((byte) 0x37, (byte) 0xE2, (byte) 0x83, (byte) 0xA3), (char) 0xE222);
        map.put(new Emoj4byte((byte) 0x38, (byte) 0xE2, (byte) 0x83, (byte) 0xA3), (char) 0xE223);
        map.put(new Emoj4byte((byte) 0x39, (byte) 0xE2, (byte) 0x83, (byte) 0xA3), (char) 0xE224);
        map.put(new Emoj4byte((byte) 0x30, (byte) 0xE2, (byte) 0x83, (byte) 0xA3), (char) 0xE225);
        map.put(new Emoj4byte((byte) 0x23, (byte) 0xE2, (byte) 0x83, (byte) 0xA3), (char) 0xE210);


        map.put(new Emoj4byte((byte) 0xE2, (byte) 0xAC, (byte) 0x86), (char) 0xE232);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0xAC, (byte) 0x87), (char) 0xE233);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0xAC, (byte) 0x85), (char) 0xE235);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x9E, (byte) 0xA1), (char) 0xE234);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x86, (byte) 0x97), (char) 0xE236);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x86, (byte) 0x96), (char) 0xE237);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x86, (byte) 0x98), (char) 0xE238);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x86, (byte) 0x99), (char) 0xE239);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x97, (byte) 0x80), (char) 0xE23B);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x96, (byte) 0xB6), (char) 0xE23A);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x8F, (byte) 0xAA), (char) 0xE23D);


        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x8F, (byte) 0xA9), (char) 0xE23C);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x86, (byte) 0x97), (char) 0xE24D);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x86, (byte) 0x95), (char) 0xE212);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x94, (byte) 0x9D), (char) 0xE24C);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x86, (byte) 0x99), (char) 0xE213);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x86, (byte) 0x92), (char) 0xE214);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x8E, (byte) 0xA6), (char) 0xE507);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x88, (byte) 0x81), (char) 0xE203);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x93, (byte) 0xB6), (char) 0xE20B);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x88, (byte) 0xB5), (char) 0xE22A);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x88, (byte) 0xB3), (char) 0xE22B);


        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x89, (byte) 0x90), (char) 0xE226);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x88, (byte) 0xB9), (char) 0xE227);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x88, (byte) 0xAF), (char) 0xE22C);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x88, (byte) 0xBA), (char) 0xE22D);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x88, (byte) 0xB6), (char) 0xE215);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x88, (byte) 0x9A), (char) 0xE216);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x88, (byte) 0xB7), (char) 0xE217);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x88, (byte) 0xB8), (char) 0xE218);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x88, (byte) 0x82), (char) 0xE228);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x9A, (byte) 0xBB), (char) 0xE151);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x9A, (byte) 0xB9), (char) 0xE138);


        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x9A, (byte) 0xBA), (char) 0xE139);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x9A, (byte) 0xBC), (char) 0xE13A);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x9A, (byte) 0xAD), (char) 0xE208);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x85, (byte) 0xBF), (char) 0xE14F);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x99, (byte) 0xBF), (char) 0xE20A);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x9A, (byte) 0x87), (char) 0xE434);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x9A, (byte) 0xBE), (char) 0xE309);
        map.put(new Emoj4byte((byte) 0xE3, (byte) 0x8A, (byte) 0x99), (char) 0xE315);
        map.put(new Emoj4byte((byte) 0xE3, (byte) 0x8A, (byte) 0x97), (char) 0xE30D);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x94, (byte) 0x9E), (char) 0xE207);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x86, (byte) 0x94), (char) 0xE229);


        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x9C, (byte) 0xB3), (char) 0xE206);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x9C, (byte) 0xB4), (char) 0xE205);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x92, (byte) 0x9F), (char) 0xE204);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x86, (byte) 0x9A), (char) 0xE12E);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x93, (byte) 0xB3), (char) 0xE250);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x93, (byte) 0xB4), (char) 0xE251);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x92, (byte) 0xB9), (char) 0xE14A);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x92, (byte) 0xB1), (char) 0xE149);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x99, (byte) 0x88), (char) 0xE23F);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x99, (byte) 0x89), (char) 0xE240);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x99, (byte) 0x8A), (char) 0xE241);

        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x99, (byte) 0x8B), (char) 0xE242);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x99, (byte) 0x8C), (char) 0xE243);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x99, (byte) 0x8D), (char) 0xE244);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x99, (byte) 0x8E), (char) 0xE245);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x99, (byte) 0x8F), (char) 0xE246);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x99, (byte) 0x90), (char) 0xE247);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x99, (byte) 0x91), (char) 0xE248);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x99, (byte) 0x92), (char) 0xE249);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x99, (byte) 0x93), (char) 0xE24A);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x9B, (byte) 0x8E), (char) 0xE24B);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x94, (byte) 0xAF), (char) 0xE23E);


        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x85, (byte) 0xB0), (char) 0xE532);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x85, (byte) 0xB1), (char) 0xE533);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x86, (byte) 0x8E), (char) 0xE534);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x85, (byte) 0xBE), (char) 0xE535);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x94, (byte) 0xB2), (char) 0xE21A);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x94, (byte) 0xB4), (char) 0xE219);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x94, (byte) 0xB3), (char) 0xE21B);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x95, (byte) 0x9B), (char) 0xE02F);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x95, (byte) 0x90), (char) 0xE024);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x95, (byte) 0x91), (char) 0xE025);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x95, (byte) 0x92), (char) 0xE026);


        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x95, (byte) 0x93), (char) 0xE027);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x95, (byte) 0x94), (char) 0xE028);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x95, (byte) 0x95), (char) 0xE029);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x95, (byte) 0x96), (char) 0xE02A);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x95, (byte) 0x97), (char) 0xE02B);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x95, (byte) 0x98), (char) 0xE02C);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x95, (byte) 0x99), (char) 0xE02D);
        map.put(new Emoj4byte((byte) 0xF0, (byte) 0x9F, (byte) 0x95, (byte) 0x9A), (char) 0xE02E);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0xAD, (byte) 0x95), (char) 0xE332);
        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x9D, (byte) 0x8C), (char) 0xE333);


        map.put(new Emoj4byte((byte) 0xE2, (byte) 0x84, (byte) 0xA2), (char) 0xE537);
    }


    static class Emoj4byte {
        private byte[] bytes;

        public Emoj4byte() {
        }

        public Emoj4byte(byte... b) {
            this.bytes = b;
        }


        public byte[] getBytes() {
            return bytes;
        }

        public void setBytes(byte[] bytes) {
            this.bytes = bytes;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            Emoj4byte b4 = (Emoj4byte) o;

            return Arrays.equals(bytes, b4.bytes);

        }

        @Override
        public int hashCode() {
            return bytes != null ? Arrays.hashCode(bytes) : 0;
        }
    }
}
