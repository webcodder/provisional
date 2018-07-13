package util;

import java.util.Random;

/**
 * ��֤���ࣺ���ڵ�¼ע����֤
 * @author zmx2321
 *
 */

public class CodeGen {
	/**
	 * @param ���һ����֤��
	 * @return	str
	 */
	public static String getCodeGen(){
		//һ���ַ�����
		char[] codeSequence = { 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
				'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W',
				'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
				'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w',
				'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' };
		
		Random radom = new Random();  //�����
		StringBuilder sb = new StringBuilder();  //��̬�ַ���
		int count = 0;  //������
		
		while(true){
			//�������һ���±꣬ͨ���±�ȡ���ַ������еĶ�Ӧ���ַ�
			char c = codeSequence[radom.nextInt(codeSequence.length)];
			
			//����ȡ�������ַ��ڶ�̬�ַ����в����ڣ�����û���ظ�
			if(sb.indexOf(c + "") == -1){
				sb.append(c);  //׷�ӵ���̬�ַ�����
				count++;
				
				if(count == 4){
					break;
				}
			}
		}
		
		//�����ַ���
		return sb.toString();
	}
	
	//��֤��ľ����������
	public static void operaCodeGen(){
		String codegen = "";  //����������֤��
		boolean flag = true;  //�����ж��Ƿ�����ѭ��
		
		while(flag){
			//����RandomGen���е�����������������������ɵ����������һ���ַ���������
			String codeGenAuto = CodeGen.getCodeGen();
			System.out.println("������֤���ǣ�" + codeGenAuto);
			
			//������֤��
			codegen = Help.getString("��������֤��(�����ִ�Сд)��");
			
			//�ж���֤�룬�����ִ�Сд
			if(codegen.equalsIgnoreCase(codeGenAuto)){
				System.out.println("��֤����ȷ\n");
				flag = false;  //�����ȷ������ѭ��
			}else{
				System.out.println("��֤�����\n");
			}
		}
	}
	
	//test
	public static void main(String[] args) {
		CodeGen.operaCodeGen();
	}
}
