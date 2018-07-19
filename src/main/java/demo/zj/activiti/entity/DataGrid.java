package demo.zj.activiti.entity;

import java.util.ArrayList;
import java.util.List;

/**
 * @author zj 封装类 通过泛型封装JSON的结果数据 total 初始化为0 rows为List集合的泛型
 */

/*
 * 该类为封装JSON的结果数据集， 所以两个变量的名字要对应JSON的格式 并且为了简便省去拼接，我们定义row为List的集合
 */
public class DataGrid extends Ret {
	private static final long serialVersionUID = -6238592827244702410L;

	public DataGrid() {
		super();
	}

	/**
	 * 返回结果
	 */
	private long total = 0;// 总记录数

	@SuppressWarnings("rawtypes")
	private List<?> rows = new ArrayList();// easyUI 返回的数据集合

	/*
	 * setting 、getting 方法
	 */
	public long getTotal() {
		return total;
	}

	public void setTotal(long total) {
		this.total = total;
	}

	public List<?> getRows() {
		return rows;
	}

	public void setRows(List<?> rows) {
		this.rows = rows;
	}

}