package view;

import contro.MovieControl;
import util.Help;

/**
 * 
 * @param ��Ӱ�������
 * @author zmx2321
 * 
 */

public class MovieView {
	private static boolean flag = true;  //�����ж��Ƿ�����ѭ��
	
	public static void movieMune(){
		System.out.println("��ӭ�����Ӱ������棺");
		
		while(flag){
			System.out.println("*********************");
			System.out.println("1:�鿴ȫ����Ӱ");
			System.out.println("2:��ӵ�Ӱ");
			System.out.println("3:ɾ����Ӱ");
			System.out.println("0:����");
			System.out.println("*********************");
			
			int ops = Help.getInt("\n����������Ҫ�Ĳ�����");
			
			switch (ops){
				case 1:
					System.out.println("�鿴ȫ����Ӱ\n");
					MovieControl.queryMovies();
					break;
				case 2: 
					System.out.println("��ӵ�Ӱ\n");
					break;
				case 3: 
					System.out.println("ɾ����Ӱ\n");
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
		movieMune();
	}
}
