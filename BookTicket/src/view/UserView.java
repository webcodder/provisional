package view;

import contro.MovieControl;
import contro.UserContro;
import util.Help;

/**
 * 
 * @param �û�����
 * @author zmx2321
 * 
 */

public class UserView {
	private static boolean flag = true;  //�����ж��Ƿ�����ѭ��
	
	public static void userMune() {
		System.out.println("��ӭ�����û����棺");
		
		while(flag){
			System.out.println("*********************");
			System.out.println("1:��Ʊ");
			System.out.println("2:��Ӱ��ѯ");
			System.out.println("3:��ֵ");
			System.out.println("4:�ҵĵ�ӰƱ�����ۡ�");
			System.out.println("5:������Ϣ");
			System.out.println("0:����");
			System.out.println("*********************");
			
			int ops = Help.getInt("\n����������Ҫ�Ĳ�����");
			
			switch (ops){
				case 1:
					System.out.println("��Ʊ\n");
					break;
				case 2: 
					System.out.println("��Ӱ��ѯ\n");
					MovieControl.queryMovies();
					break;
				case 3: 
					System.out.println("��ֵ\n");
					UserContro.updateAccount();
					break;
				case 4: 
					System.out.println("�ҵĵ�ӰƱ�����ۡ�\n");
					break;
				case 5: 
					System.out.println("������Ϣ\n");
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
	
	public static void main(String[] args) {
		userMune();
	}
}
