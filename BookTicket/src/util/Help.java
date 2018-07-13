package util;

import java.util.Scanner;

/**
 * @param 工具类，用户输入
 * @author zmx2321
 *
 */
public class Help {
	//获取输入
	private static Scanner in = new Scanner(System.in);

	/**
	 * @param 从控制台输入一个数据 返回给调用方 这个方法可以使用与任何一个需求
	 *            
	 * @return 用户提示信息、用户输入的信息 ,字符串类型
	 */
	public static String getString(String str) {
		System.out.print(str);
		return in.next();
	}

	/**
	 * 
	 * @param 从控制台输入一个数据 返回给调用方 这个方法可以使用与任何一个需求
	 *            
	 * @return 用户提示信息、用户输入的信息 整形
	 */
	public static int getInt(String str) {
		System.out.print(str);
		while (true) {
			try {
				int num = in.nextInt();// 可能会造成异常现在
				return num;
			} catch (Exception e) {
				System.out.print("您的输入有误，请重新输入\n请输入一个整数：");
				in.nextLine();
			}
		}
	}
	
	/**
	 * 
	 * @param 从控制台输入一个数据 返回给调用方 这个方法可以使用与任何一个需求
	 *            
	 * @return 用户提示信息、用户输入的信息 浮点数
	 */
	public static float getFloat(String str) {
		System.out.print(str);
		while (true) {
			try {
				float num = in.nextFloat();// 可能会造成异常现在
				return num;
			} catch (Exception e) {
				System.out.print("您的输入有误，请重新输入\n请输入一个小数：");
				in.nextFloat();
			}
		}
	}
	
	//test
	public static void main(String[] args) {
		Help.getInt("输入数字：");
		
		Help.getString("输入字符串：");
	}
}
