package view;

import util.Help;

/**
 * 
 * @param ����Ա����
 * @author zmx2321
 * 
 */

public class AdminView {
	private static boolean flag = true;  //�����ж��Ƿ�����ѭ��
	
	//����Ա�˵�ѡ��
	public static void adminMune(){
		System.out.println("��ӭ�������Ա���棺");
		
		while(flag){
			System.out.println("*********************");
			System.out.println("1:��Ӱ����");
			System.out.println("2:ӰԺ����");
			System.out.println("3:���ι���");
			System.out.println("4:��������");
			System.out.println("0:����");
			System.out.println("*********************");
			
			int num = Help.getInt("����������Ҫ��ѡ�");
			switch (num){
				case 1:
					System.out.println("ӰԺ����\n");
					MovieView.movieMune();
					break;
				case 2: 
					System.out.println("ӰԺ����\n");
					break;
				case 3:
					System.out.println("���ι���\n");
					break;
				case 4:
					System.out.println("��������\n");
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
		AdminView.adminMune();
	}
}
