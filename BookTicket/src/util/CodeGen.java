package util;

import java.util.Random;

/**
 * 验证码类：用于登录注册验证
 * @author zmx2321
 *
 */

public class CodeGen {
	/**
	 * @param 获得一个验证码
	 * @return	str
	 */
	public static String getCodeGen(){
		//一个字符数组
		char[] codeSequence = { 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
				'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W',
				'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
				'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w',
				'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' };
		
		Random radom = new Random();  //随机数
		StringBuilder sb = new StringBuilder();  //动态字符串
		int count = 0;  //计数器
		
		while(true){
			//随机产生一个下标，通过下标取出字符数组中的对应的字符
			char c = codeSequence[radom.nextInt(codeSequence.length)];
			
			//假设取出来的字符在动态字符串中不存在，代表没有重复
			if(sb.indexOf(c + "") == -1){
				sb.append(c);  //追加到动态字符串中
				count++;
				
				if(count == 4){
					break;
				}
			}
		}
		
		//返回字符串
		return sb.toString();
	}
	
	//验证码的具体操作方法
	public static void operaCodeGen(){
		String codegen = "";  //用来保存验证码
		boolean flag = true;  //用来判断是否跳出循环
		
		while(flag){
			//调用RandomGen类中的生成随机数方法，并将生成的随机数存入一个字符串变量中
			String codeGenAuto = CodeGen.getCodeGen();
			System.out.println("您的验证码是：" + codeGenAuto);
			
			//输入验证码
			codegen = Help.getString("请输入验证码(不区分大小写)：");
			
			//判断验证码，不区分大小写
			if(codegen.equalsIgnoreCase(codeGenAuto)){
				System.out.println("验证码正确\n");
				flag = false;  //如果正确，跳出循环
			}else{
				System.out.println("验证码错误\n");
			}
		}
	}
	
	//test
	public static void main(String[] args) {
		CodeGen.operaCodeGen();
	}
}
