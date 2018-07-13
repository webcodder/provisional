package view;

import contro.MovieControl;
import contro.UserContro;
import util.Help;

/**
 * 
 * @param 用户界面
 * @author zmx2321
 * 
 */

public class UserView {
	private static boolean flag = true;  //用于判断是否跳出循环
	
	public static void userMune() {
		System.out.println("欢迎进入用户界面：");
		
		while(flag){
			System.out.println("*********************");
			System.out.println("1:购票");
			System.out.println("2:电影查询");
			System.out.println("3:充值");
			System.out.println("4:我的电影票【评论】");
			System.out.println("5:个人信息");
			System.out.println("0:返回");
			System.out.println("*********************");
			
			int ops = Help.getInt("\n请输入您需要的操作：");
			
			switch (ops){
				case 1:
					System.out.println("购票\n");
					break;
				case 2: 
					System.out.println("电影查询\n");
					MovieControl.queryMovies();
					break;
				case 3: 
					System.out.println("充值\n");
					UserContro.updateAccount();
					break;
				case 4: 
					System.out.println("我的电影票【评论】\n");
					break;
				case 5: 
					System.out.println("个人信息\n");
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
	
	public static void main(String[] args) {
		userMune();
	}
}
