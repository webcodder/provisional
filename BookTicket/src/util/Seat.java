package util;

public class Seat {
	//ÏÔÊ¾×ùÎ»
	public static void seat(){
		int a=1;
		for(int i=0; i<5; i++){
			for(int j=0; j<8; j++){
				/*if(×ùÎ»Âôµô){
					syso
				}else{
					syso
				}*/
				if(a>0){
					System.out.print("[x]");
				}else{
					System.out.print("[_]");
				}
			}
			System.out.println();
		}
	}
	
	public static void main(String[] args) {
		seat();
	}
}
