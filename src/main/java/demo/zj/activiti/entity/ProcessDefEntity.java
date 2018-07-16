package demo.zj.activiti.entity;

import org.activiti.engine.repository.Deployment;

public class ProcessDefEntity {

	/** unique identifier */
	private String id;

	/**
	 * category name which is derived from the targetNamespace attribute in the
	 * definitions element
	 */
	private String category;

	/** label used for display purposes */
	private String name;

	/** unique name for all versions this process definitions */
	private String key;

	/** description of this process **/
	private String description;

	/** version of this process definition */
	private int version;

	/**
	 * name of {@link RepositoryService#getResourceAsStream(String, String) the
	 * resource} of this process definition.
	 */
	private String resourceName;

	/** The deployment in which this process definition is contained. */
	private String deploymentId;

	/** The resource name in the deployment of the diagram image (if any). */
	private String diagramResourceName;

	/**
	 * Does this process definition has a
	 * {@link FormService#getStartFormData(String) start form key}.
	 */
	private boolean hasStartFormKey;

	/**
	 * Does this process definition has a graphical notation defined (such that
	 * a diagram can be generated)?
	 */
	private boolean hasGraphicalNotation;

	/** Returns true if the process definition is in suspended state. */
	private boolean suspended;

	/** The tenant identifier of this process definition */
	private String tenantId;

	private DeploymentEntity deploymentEntity;
	
	private Deployment deployment;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}

	public String getResourceName() {
		return resourceName;
	}

	public void setResourceName(String resourceName) {
		this.resourceName = resourceName;
	}

	public String getDeploymentId() {
		return deploymentId;
	}

	public void setDeploymentId(String deploymentId) {
		this.deploymentId = deploymentId;
	}

	public String getDiagramResourceName() {
		return diagramResourceName;
	}

	public void setDiagramResourceName(String diagramResourceName) {
		this.diagramResourceName = diagramResourceName;
	}

	public boolean isHasStartFormKey() {
		return hasStartFormKey;
	}

	public void setHasStartFormKey(boolean hasStartFormKey) {
		this.hasStartFormKey = hasStartFormKey;
	}

	public boolean isHasGraphicalNotation() {
		return hasGraphicalNotation;
	}

	public void setHasGraphicalNotation(boolean hasGraphicalNotation) {
		this.hasGraphicalNotation = hasGraphicalNotation;
	}

	public boolean isSuspended() {
		return suspended;
	}

	public void setSuspended(boolean suspended) {
		this.suspended = suspended;
	}

	public String getTenantId() {
		return tenantId;
	}

	public void setTenantId(String tenantId) {
		this.tenantId = tenantId;
	}

	public DeploymentEntity getDeploymentEntity() {
		return deploymentEntity;
	}

	public void setDeploymentEntity(DeploymentEntity deploymentEntity) {
		this.deploymentEntity = deploymentEntity;
	}

	public Deployment getDeployment() {
		return deployment;
	}

	public void setDeployment(Deployment deployment) {
		this.deployment = deployment;
	}

}