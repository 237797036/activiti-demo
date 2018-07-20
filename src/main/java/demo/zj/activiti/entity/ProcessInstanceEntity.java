package demo.zj.activiti.entity;

public class ProcessInstanceEntity {

	/** DB id of this process instance. */
	private String id;

	/**
	 * Returns the id of this process instance.
	 */
	private String processInstanceId;

	/**
	 * Returns the name of this process instance.
	 */
	private String name;

	/**
	 * Returns the description of this process instance.
	 */
	private String description;

	/**
	 * The id of the process definition of the process instance.
	 */
	private String processDefinitionId;

	/**
	 * The name of the process definition of the process instance.
	 */
	private String processDefinitionName;

	/**
	 * The key of the process definition of the process instance.
	 */
	private String processDefinitionKey;

	/**
	 * The version of the process definition of the process instance.
	 */
	private Integer processDefinitionVersion;

	/**
	 * The deployment id of the process definition of the process instance.
	 */
	private String deploymentId;

	/**
	 * The business key of this process instance.
	 */
	private String businessKey;

	/**
	 * returns true if the process instance is suspended
	 */
	private boolean suspended;
	
	  /**
	   * The id of the current activity position
	   */
	private String activityId;
	  
	  /**
	   * The name of the current activity position
	   */
	private String activityName;

	/**
	 * The tenant identifier of this process instance
	 */
	private String tenantId;

	/**
	 * Returns the localized name of this process instance.
	 */
	private String localizedName;

	/**
	 * Returns the localized description of this process instance.
	 */
	private String localizedDescription;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getProcessInstanceId() {
		return processInstanceId;
	}

	public void setProcessInstanceId(String processInstanceId) {
		this.processInstanceId = processInstanceId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getProcessDefinitionId() {
		return processDefinitionId;
	}

	public void setProcessDefinitionId(String processDefinitionId) {
		this.processDefinitionId = processDefinitionId;
	}

	public String getProcessDefinitionName() {
		return processDefinitionName;
	}

	public void setProcessDefinitionName(String processDefinitionName) {
		this.processDefinitionName = processDefinitionName;
	}

	public String getProcessDefinitionKey() {
		return processDefinitionKey;
	}

	public void setProcessDefinitionKey(String processDefinitionKey) {
		this.processDefinitionKey = processDefinitionKey;
	}

	public Integer getProcessDefinitionVersion() {
		return processDefinitionVersion;
	}

	public void setProcessDefinitionVersion(Integer processDefinitionVersion) {
		this.processDefinitionVersion = processDefinitionVersion;
	}

	public String getDeploymentId() {
		return deploymentId;
	}

	public void setDeploymentId(String deploymentId) {
		this.deploymentId = deploymentId;
	}

	public String getBusinessKey() {
		return businessKey;
	}

	public void setBusinessKey(String businessKey) {
		this.businessKey = businessKey;
	}

	public boolean isSuspended() {
		return suspended;
	}

	public void setSuspended(boolean suspended) {
		this.suspended = suspended;
	}

	public String getActivityId() {
		return activityId;
	}

	public void setActivityId(String activityId) {
		this.activityId = activityId;
	}

	public String getActivityName() {
		return activityName;
	}

	public void setActivityName(String activityName) {
		this.activityName = activityName;
	}

	public String getTenantId() {
		return tenantId;
	}

	public void setTenantId(String tenantId) {
		this.tenantId = tenantId;
	}

	public String getLocalizedName() {
		return localizedName;
	}

	public void setLocalizedName(String localizedName) {
		this.localizedName = localizedName;
	}

	public String getLocalizedDescription() {
		return localizedDescription;
	}

	public void setLocalizedDescription(String localizedDescription) {
		this.localizedDescription = localizedDescription;
	}
}
