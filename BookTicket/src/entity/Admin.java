package entity;

import util.CodeGen;
import util.Help;
import view.AdminView;

public class Admin {
	//管理员账号
	private String user = "";  //管理员用户名
	private String pwd = "";  //管理员密码
		
	//构造方法(无参)
	public Admin() {
		
	}
	//构造方法(管理员账号)
	public Admin(String user,String pwd) {
		this.user = user;
		this.pwd = pwd;
	}
	
	//为管理员私有属性开放接口
	public  String getUser() {  //user
		return user;
	}
	public  void setUser (String user) {
		this.user = user;
	}

	public  String getPwd() {  //pwd
		return pwd;
	}
	public  void setPwd(String pwd) {
		this.pwd = pwd;
	}
	
	//默认管理员账号
	public static Admin[] adminAccount(){
		Admin[] admin = new Admin[1];
		Admin admin1 = new Admin("admin", "123123");
		admin[0] = admin1;
		return admin;
	}
	
	//管理员登录
	public static void adminLogin(){
		Admin[] adminAccount = Admin.adminAccount();  //实例化管理员账号对象数组
		
		//保存账号信息
		String user = "";  //用户名
		String pwd = "";  //密码
		
		boolean flag = true;  //用来判断是否跳出循环
		
		//管理员账号
		for(Admin i:adminAccount){
			System.out.println(i.getUser() + "--" + i.getPwd());
			
			user = Help.getString("请输入管理员账号：");
			pwd = Help.getString("请输入密码：");
			
			while(flag){
				if(i.getUser().equals(user) && i.getPwd().equals(pwd)){
					CodeGen.operaCodeGen();
					System.out.println("管理员登录成功！");
					AdminView.adminMune();  //管理员功能菜单
					flag = false;
				}else{
					System.out.println("用户名或密码错误，请重新输入");
					user = Help.getString("请输入管理员账号：");
					pwd = Help.getString("请输入密码：");
				}
			}
		}
	}

	//test
	public static void main(String[] args) {
		adminLogin();
	}
}
