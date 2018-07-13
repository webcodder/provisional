package util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class DataDemo {
	public static void main(String[] args) {
		Date date = new Date();  //调用系统默认时间
		System.out.println(date);  //Thu Dec 14 17:17:51 CST 2017
		System.out.println(date.getTime());  //返回自 1970 年 1 月 1 日 00:00:00 GMT 以来此 Date 对象表示的毫秒数。
		
		//设置时间
		date.setTime(1513243234809L);
		System.out.println(date);
		
		//日期格式化类(抽象类)DateFormat(public abstract class DateFormatextends Format)
		DateFormat df1 = null;
		DateFormat df2 = null;
		DateFormat df3 = null;
		DateFormat df4 = null;
		DateFormat df5 = null;
		
		//产生子类对象(静态可以直接类名.方法)
		//构造出一个子类对象
		//抽象类不能实例化，但可以通过子类实例化构建子类对象
		df1 = DateFormat.getDateInstance();
		df2 = DateFormat.getDateTimeInstance();
		df3 = DateFormat.getDateInstance(DateFormat.FULL, new Locale("zh", "CN"));  //日期格式，区域
		df4 = DateFormat.getDateInstance(DateFormat.FULL, new Locale("en", "US"));
		df5 = DateFormat.getDateTimeInstance(DateFormat.FULL, DateFormat.FULL, new Locale("zh", "CN"));  //日期格式，时间格式，区域
		
		System.out.println("日期：" + df1.format(date));
		System.out.println("时间：" + df2.format(date));
		System.out.println("中国：" + df3.format(date));
		System.out.println("美国：" + df4.format(date));
		System.out.println("时间：" + df5.format(date));
		
		//自定义格式输出--SimpleDateFormat(DateFormat的子类)
		String strDate = "2010-10-19 10:11:30.345";
		//声明一个日期对象
		Date d = null;
		SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");  //日期格式化对象
		SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy年MM月dd日 HH-mm-ss.SSS");
		
		try {
			d = sdf1.parse(strDate);  //把日期字符串中的日期部分抽取出来，生成一个Date对象
		} catch (ParseException e) {
			//e.printStackTrace();  //打印堆栈
			e.getMessage();
		}
		System.out.println(d);
		
		String str = sdf2.format(d);  //把日期按指定的模板格式输出为字符串
		System.out.println(str);
	}
}
