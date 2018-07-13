package view;

import contro.MovieControl;
import util.Help;

/**
 * 
 * @param 电影管理界面
 * @author zmx2321
 * 
 */

public class MovieView {
	private static boolean flag = true;  //用于判断是否跳出循环
	
	public static void movieMune(){
		System.out.println("欢迎进入电影管理界面：");
		
		while(flag){
			System.out.println("*********************");
			System.out.println("1:查看全部电影");
			System.out.println("2:添加电影");
			System.out.println("3:删除电影");
			System.out.println("0:返回");
			System.out.println("*********************");
			
			int ops = Help.getInt("\n请输入您需要的操作：");
			
			switch (ops){
				case 1:
					System.out.println("查看全部电影\n");
					MovieControl.queryMovies();
					break;
				case 2: 
					System.out.println("添加电影\n");
					break;
				case 3: 
					System.out.println("删除电影\n");
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
		movieMune();
	}
}
