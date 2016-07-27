package com.kk.utils;

import java.util.BitSet;

/**
 * Created by xienan on 2015/7/2.
 */
public class BitSetUtils {
    public static boolean isFullFillWith(BitSet bitSet, int fromIndex, int toIndex, boolean flag){
        for (int i = fromIndex; i < toIndex; i++) {
            if (bitSet.get(i) != flag)
                return false;
        }

        return true;
    }
}
