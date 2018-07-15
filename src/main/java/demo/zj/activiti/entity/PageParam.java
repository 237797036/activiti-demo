package demo.zj.activiti.entity;

public class PageParam {
	// page是easyui传递到后台的值，表示页码
	public int page = 1;
	// rows是easyui传递到后台的值，表示每页大小
	public int rows = 10;

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public int getRows() {
		return rows;
	}

	public void setRows(int rows) {
		this.rows = rows;
	}

}
