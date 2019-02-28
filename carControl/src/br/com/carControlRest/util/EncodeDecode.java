package br.com.carControlRest.util;

import java.io.IOException;
import javax.servlet.ServletException;
import java.util.Base64;
import org.apache.commons.codec.digest.DigestUtils;  


public class EncodeDecode {
	//Salt
	public String salt(String textoMD5, String texto )throws ServletException, IOException {
		
		String sSalt=DigestUtils.md5Hex(textoMD5 + texto.length());
		System.out.println("sSalt: "+sSalt);           
		return sSalt;
	}
	//Encode base 64
	public String encode64(String texto) {
        String texto64 = Base64.getEncoder().encodeToString(texto.getBytes());
        System.out.println("Base64 : "+texto64);
		return texto64;
	}	
    //Decode base 64  
	public String decode64(String texto64) {

        byte[] textoByte = Base64.getDecoder().decode(texto64);
        String textoOrig = new String(textoByte);
        System.out.println(textoOrig);
        return textoOrig;
	}
    // md5       
	public String md5(String texto64) {
		String hashMD5 = DigestUtils.md5Hex(texto64);
        System.out.println("MD5: "+hashMD5);
		return hashMD5;
	}

}
