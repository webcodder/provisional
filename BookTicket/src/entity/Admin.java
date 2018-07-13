package entity;

import util.CodeGen;
import util.Help;
import view.AdminView;

public class Admin {
	//����Ա�˺�
	private String user = "";  //����Ա�û���
	private String pwd = "";  //����Ա����
		
	//���췽��(�޲�)
	public Admin() {
		
	}
	//���췽��(����Ա�˺�)
	public Admin(String user,String pwd) {
		this.user = user;
		this.pwd = pwd;
	}
	
	//Ϊ����Ա˽�����Կ��Žӿ�
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
	
	//Ĭ�Ϲ���Ա�˺�
	public static Admin[] adminAccount(){
		Admin[] admin = new Admin[1];
		Admin admin1 = new Admin("admin", "123123");
		admin[0] = admin1;
		return admin;
	}
	
	//����Ա��¼
	public static void adminLogin(){
		Admin[] adminAccount = Admin.adminAccount();  //ʵ��������Ա�˺Ŷ�������
		
		//�����˺���Ϣ
		String user = "";  //�û���
		String pwd = "";  //����
		
		boolean flag = true;  //�����ж��Ƿ�����ѭ��
		
		//����Ա�˺�
		for(Admin i:adminAccount){
			System.out.println(i.getUser() + "--" + i.getPwd());
			
			user = Help.getString("���������Ա�˺ţ�");
			pwd = Help.getString("���������룺");
			
			while(flag){
				if(i.getUser().equals(user) && i.getPwd().equals(pwd)){
					CodeGen.operaCodeGen();
					System.out.println("����Ա��¼�ɹ���");
					AdminView.adminMune();  //����Ա���ܲ˵�
					flag = false;
				}else{
					System.out.println("�û����������������������");
					user = Help.getString("���������Ա�˺ţ�");
					pwd = Help.getString("���������룺");
				}
			}
		}
	}

	//test
	public static void main(String[] args) {
		adminLogin();
	}
}
