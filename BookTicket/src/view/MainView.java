package view;

import contro.UserContro;
import view.UserView;
import entity.Admin;
import entity.User;
import util.Help;

/**
 * 
 * @param 主菜单界面
 * @author zmx2321
 * 
 */

public class MainView {
	private static boolean flag = true;  //用于判断是否跳出循环
	
	public static void mune(){
		System.out.println("*********************************欢迎使用电影管理系统***************************************"); 
		
		while(flag){
			System.out.println("1:登录\t 2:注册\t 0:退出");
			
			int num = Help.getInt("请输入您需要的选项：");
			switch (num){
				case 1:
					loginChosen();  //登录
					flag = true;
					break;
				case 2: 
					registerChosen();  //注册
					flag = true;
					break;
				case 0:
					System.out.println("\n退出，欢迎下次光临！");
					flag = false;
					break;
				default:
					System.out.println("输入错误,没有该选项\n");
					break;
			}
		}
		System.exit(0);  //退出
	}
	
	//登录身份选择
	public static void loginChosen(){
		while(flag){
			System.out.println("\n请选择您的身份进行登录");
			System.out.println("1:管理员\t 2:用户\t 0:返回");
			
			int num = Help.getInt("请选择您的身份：");
			
			switch (num){
				case 1:
					System.out.println("\n您正在进行管理员登录：");
					Admin.adminLogin();
					break;
				case 2: 
					System.out.println("\n您正在进行用户登录");
					
					//登录
					User user = UserContro.login();
					
					//判断是否为空
					if(user!=null){
						UserView.userMune();
					}
					
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
	
	//登录身份选择
	public static void registerChosen(){
		while(flag){
			System.out.println("\n请选择您的身份进行注册");
			System.out.println("1:管理员\t 2:用户\t 0:返回");
			
			int num = Help.getInt("请选择您的身份：");
			
			switch (num){
				case 1:
					System.out.println("暂无权限~");
					break;
				case 2: 
					System.out.println("您正在进行用户注册：\n");
					
					//注册
					UserContro.regist();
					flag = false;
					
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
		mune();
	}
}
