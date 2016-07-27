package com.kk.utils;

public class DistanceUtil {
	private static final double EARTH_RADIUS = 6378137;   
	private static double rad(double d)   
	{   
	     return d * Math.PI / 180.0;   
	}    
	  
	/**   
	 * 根据两点间经纬度坐标（double值），计算两点间距离，单位为米   
	 */   
	public static double getDistance(double lat1, double lng1, double lat2, double lng2)   
	{   
	    double radLat1 = rad(lat1);   
	    double radLat2 = rad(lat2);   
	    double a = radLat1 - radLat2;   
	    double b = rad(lng1) - rad(lng2);   
	    double s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +   
	    Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));   
	    s = s * EARTH_RADIUS;   
	    s = Math.round(s * 10000) / 10000;   
	    return s;   
	}   
	
	private static final int AVERAGE_SPEED = 15;//平均的路上速度 米每秒 换算千米每小时*3.6
	public static int getDurtion(double lat1, double lng1, double lat2, double lng2){
		double distance = getDistance(lat1, lng1, lat2, lng2);
		distance = distance*1.5;//实际距离会更远
		
		return (int) (distance/AVERAGE_SPEED);
	}
	public static int getDurtion(String lat1, String lng1, String lat2, String lng2){
		return getDurtion(Double.parseDouble(lat1), Double.parseDouble(lng1), Double.parseDouble(lat2), Double.parseDouble(lng2));
	}
}
