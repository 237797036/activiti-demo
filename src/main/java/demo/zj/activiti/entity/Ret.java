package demo.zj.activiti.entity;

import org.springframework.stereotype.Component;

@Component
public class Ret {
	
	public String code="0000";
	public String message="success";
	public Object data = new Object();
	
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public Object getData() {
		return data;
	}
	public void setData(Object data) {
		this.data = data;
	}

}
