package demo.zj.activiti.entity;

public class PageParam {

	/**
	 * page是easyui传递到后台的值，表示当前页码
	 */
	private int page;

	/**
	 * rows是easyui传递到后台的值，表示每页大小
	 */
	private int rows = -1;

	public PageParam() {
		super();
	}

	public int getPage() {
		return page;
	}

	public void setPage(final int page) {
		this.page = page;
		if (page < 1) {
			this.page = 1;
		}
	}

	public int getRows() {
		return rows;
	}

	public void setRows(final int rows) {
		this.rows = rows;
	}

	/**
	 * 当前页第一条记录在总结果集中的位置,序号从0开始
	 * 
	 * @return
	 */
	public int getFirstResult() {
		return (page - 1) * rows;
	}

	/**
	 * 表示查多少条记录，等于每页的条数
	 * 
	 * @return
	 */
	public int getMaxResults() {
		return rows;
	}
}
