package view;

import util.Help;

/**
 * 
 * @param 管理员界面
 * @author zmx2321
 * 
 */

public class AdminView {
	private static boolean flag = true;  //用于判断是否跳出循环
	
	//管理员菜单选择
	public static void adminMune(){
		System.out.println("欢迎进入管理员界面：");
		
		while(flag){
			System.out.println("*********************");
			System.out.println("1:电影管理");
			System.out.println("2:影院管理");
			System.out.println("3:场次管理");
			System.out.println("4:订单管理");
			System.out.println("0:返回");
			System.out.println("*********************");
			
			int num = Help.getInt("请输入您需要的选项：");
			switch (num){
				case 1:
					System.out.println("影院管理\n");
					MovieView.movieMune();
					break;
				case 2: 
					System.out.println("影院管理\n");
					break;
				case 3:
					System.out.println("场次管理\n");
					break;
				case 4:
					System.out.println("订单管理\n");
					break;
				case 0:
					System.out.println("返回\n");
					flag = false;
					break;
				default:
					System.out.println("输入错误,没有该选项\n");
					break;
			}
		}
	}
	
	//test
	public static void main(String[] args) {
		AdminView.adminMune();
	}
}
