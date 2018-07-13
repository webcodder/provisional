package view;

import contro.UserContro;
import view.UserView;
import entity.Admin;
import entity.User;
import util.Help;

/**
 * 
 * @param ���˵�����
 * @author zmx2321
 * 
 */

public class MainView {
	private static boolean flag = true;  //�����ж��Ƿ�����ѭ��
	
	public static void mune(){
		System.out.println("*********************************��ӭʹ�õ�Ӱ����ϵͳ***************************************"); 
		
		while(flag){
			System.out.println("1:��¼\t 2:ע��\t 0:�˳�");
			
			int num = Help.getInt("����������Ҫ��ѡ�");
			switch (num){
				case 1:
					loginChosen();  //��¼
					flag = true;
					break;
				case 2: 
					registerChosen();  //ע��
					flag = true;
					break;
				case 0:
					System.out.println("\n�˳�����ӭ�´ι��٣�");
					flag = false;
					break;
				default:
					System.out.println("�������,û�и�ѡ��\n");
					break;
			}
		}
		System.exit(0);  //�˳�
	}
	
	//��¼���ѡ��
	public static void loginChosen(){
		while(flag){
			System.out.println("\n��ѡ��������ݽ��е�¼");
			System.out.println("1:����Ա\t 2:�û�\t 0:����");
			
			int num = Help.getInt("��ѡ��������ݣ�");
			
			switch (num){
				case 1:
					System.out.println("\n�����ڽ��й���Ա��¼��");
					Admin.adminLogin();
					break;
				case 2: 
					System.out.println("\n�����ڽ����û���¼");
					
					//��¼
					User user = UserContro.login();
					
					//�ж��Ƿ�Ϊ��
					if(user!=null){
						UserView.userMune();
					}
					
					break;
				case 0:
					System.out.println("����\n");
					flag = false;
					break;
				default:
					System.out.println("�������,û�и�ѡ��\n");
					break;
			}
		}
	}
	
	//��¼���ѡ��
	public static void registerChosen(){
		while(flag){
			System.out.println("\n��ѡ��������ݽ���ע��");
			System.out.println("1:����Ա\t 2:�û�\t 0:����");
			
			int num = Help.getInt("��ѡ��������ݣ�");
			
			switch (num){
				case 1:
					System.out.println("����Ȩ��~");
					break;
				case 2: 
					System.out.println("�����ڽ����û�ע�᣺\n");
					
					//ע��
					UserContro.regist();
					flag = false;
					
					break;
				case 0:
					System.out.println("����\n");
					flag = false;
					
					break;
				default:
					System.out.println("�������,û�и�ѡ��\n");
					break;
			}
		}
	}
	
	//test
	public static void main(String[] args) {
		mune();
	}
}
