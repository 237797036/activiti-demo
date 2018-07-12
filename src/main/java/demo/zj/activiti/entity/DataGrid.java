package demo.zj.activiti.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * @author zj 封装类 通过泛型封装JSON的结果数据 total 初始化为0 rows为List集合的泛型
 */

/*
 * 该类为封装JSON的结果数据集， 所以两个变量的名字要对应JSON的格式 并且为了简便省去拼接，我们定义row为List的集合
 */
@SuppressWarnings("rawtypes")
public class DataGrid implements Serializable {
	private static final long serialVersionUID = -3378009226942880804L;

	public DataGrid() {
		super();
	}

	/**
	 * 返回结果
	 */
	private long total = 0;// 定义total并初始化

	private List rows = new ArrayList();// 定义List集合的泛型

	/*
	 * setting 、getting 方法
	 */
	public long getTotal() {
		return total;
	}

	public void setTotal(long total) {
		this.total = total;
	}

	public List getRows() {
		return rows;
	}

	public void setRows(List rows) {
		this.rows = rows;
	}

}