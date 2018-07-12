package com.zj.test;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.zip.ZipInputStream;
import org.activiti.engine.ProcessEngine;
import org.activiti.engine.ProcessEngineConfiguration;
import org.activiti.engine.ProcessEngines;
import org.activiti.engine.repository.Deployment;
import org.activiti.engine.repository.DeploymentBuilder;
import org.activiti.engine.repository.DeploymentQuery;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.repository.ProcessDefinitionQuery;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.runtime.ProcessInstanceQuery;
import org.activiti.engine.task.Task;
import org.activiti.engine.task.TaskQuery;
import org.apache.commons.io.FileUtils;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * @author zhongjun
 * @date 2018年6月26日 上午10:28:23
 */
@RunWith(SpringJUnit4ClassRunner.class) //使用junit4进行测试
@ContextConfiguration(locations={"classpath:applicationContext-test.xml"}) //加载配置文件
public class ActivitiAPITest {
	
    ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
	
    /**
     * 使用activiti框架提供的自动建表方式创建23张表-----没有提供配置文件
     */ 
	@Test
    public void test1() {
        // 创建一个流程引擎配置对象
        ProcessEngineConfiguration conf = 
                ProcessEngineConfiguration.createStandaloneProcessEngineConfiguration();
        // 设置jdbc连接参数
        conf.setJdbcDriver("com.mysql.jdbc.Driver"); conf.setJdbcUrl("jdbc:mysql://localhost:3306/activiti");
        conf.setJdbcUsername("root");
        conf.setJdbcPassword("root");
        // 设置自动建表
        conf.setDatabaseSchemaUpdate("true");
        // 使用配置对象创建一个流程引擎对象，并且在创建过程中可以自动建表
        @SuppressWarnings("unused")
		ProcessEngine processEngine = conf.buildProcessEngine();
    }
	
	 /**
     * 使用activiti框架提供的自动建表方式创建23张表-----提供配置文件
     */ 
    @Test
    public void test2() {
        // 获得一个流程引擎配置对象
        ProcessEngineConfiguration conf = ProcessEngineConfiguration
                .createProcessEngineConfigurationFromResource("activiti-context.xml", "processEngineConfiguration");
        // 使用配置对象创建一个流程引擎对象，并且在创建过程中可以自动建表
        @SuppressWarnings("unused")
		ProcessEngine processEngine = conf.buildProcessEngine();
    }
    
    /**
     * 使用activiti框架提供的自动建表方式创建23张表-----使用默认配置文件
     */ 
    @Test
    public void test3() {
        @SuppressWarnings("unused")
		ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
    }
    
    /**
     * 部署流程定义的两种方式--加载单个的流程定义文件
     */
    @Test
    public void test4() {
        // 创建一个部署构建器对象，用于加载流程定义文件(bpmn文件和png文件)
        DeploymentBuilder deploymentBuilder = processEngine.getRepositoryService().createDeployment();
        deploymentBuilder.addClasspathResource("qjlc.bpmn");
        deploymentBuilder.addClasspathResource("qjlc.png");
        // 部署，并返回一个部署对象(其实Deployment是一个接口)
        Deployment deployment = deploymentBuilder.deploy();//
        System.out.println(deployment.getId());
    }
    
    /**
     * 部署流程定义的两种方式--加载zip压缩文件
     */
    @Test
    public void test42() {
        DeploymentBuilder deploymentBuilder = processEngine.getRepositoryService().createDeployment();
        // 从类路径下读取process.zip压缩文件，并把它包装成一个输入流
        ZipInputStream zipInputStream = new ZipInputStream(this.getClass().getClassLoader().getResourceAsStream("process.zip")); 
        deploymentBuilder.addZipInputStream(zipInputStream );
        deploymentBuilder.deploy();
    }
    
    /**
     * 查询部署信息
     */
    @Test
    public void test43() {
        // 部署查询对象，查询部署表
        DeploymentQuery query = processEngine.getRepositoryService().createDeploymentQuery();
        List<Deployment> list = query.list();
        for (Deployment deployment : list) {
            System.out.println(deployment.getId() + "\t" + deployment.getDeploymentTime());
        }
    }
    
    /**
     * 删除部署信息
     */
    @Test
    public void test44() {
        String deploymentId = "15001"; // 部署id
        
        //processEngine.getRepositoryService().deleteDeployment(deploymentId);
        
        boolean cascade = true; // 是否级联删除，false不级联删,true则级联删除
        processEngine.getRepositoryService().deleteDeployment(deploymentId, cascade);
    }
    
    /**
     * 查询流程定义
     */ 
    @Test
    public void test5() {
        // 流程定义查询对象，用于查询流程定义表（act_re_procdef）
        ProcessDefinitionQuery query = processEngine.getRepositoryService().createProcessDefinitionQuery();
        // 根据流程定义的key来过滤
        query.processDefinitionKey("qjlc");
        
        // 根据最新版本过滤
        //query.latestVersion();//查询最新版本的流程定义数据
        
        //不加过滤条件就查所有的流程定义
        
        // 添加排序条件
        query.orderByProcessDefinitionVersion().desc();//流程定义的版本号来降序排列
        // 分页查询
        //query.listPage("从哪开始查", "查几条");
        query.listPage(1, 2);
        List<ProcessDefinition> list = query.list();
        for (ProcessDefinition pd : list) {
            System.out.println(pd.getId() + "    " + pd.getName() + "    " + pd.getVersion());
        }
    }
    
    /**
     * 获得流程定义的文件名称和输入流
     * 根据客户端传过来的部署id进行获取。
     * 这种方式可以获得两个流程定义文件的名称和其对应的输入流。
     * @throws IOException 
     */
    @Test
    public void test51() throws IOException {
        String deploymentId = "2501"; // 部署id
        // 获得两个流程定义文件的名称
        List<String> names = processEngine
                .getRepositoryService().getDeploymentResourceNames(deploymentId);
        for (String name : names) {
            System.out.println(name);
            // 获得两个流程定义文件对应的输入流
            InputStream in = processEngine
                    .getRepositoryService().getResourceAsStream(deploymentId, name);
            // 读取输入流写到指定的本地磁盘上
            FileUtils.copyInputStreamToFile(in, new File("D:\\activiti资料\\" + name));
            in.close();
        }
    }

    /**
     * 获得流程定义的文件名称和输入流
     * 根据客户端传过来的流程定义id进行获取。
     * 这种方式只能获取到png图片的名称和其对应的输入流
     * @throws IOException 
     */
    @Test
    public void test52() throws IOException {
        String processDefinitionId = "qjlc:2:2504"; // 流程定义id
        // 根据流程定义id查询流程定义对象
        ProcessDefinitionQuery query = processEngine.getRepositoryService().createProcessDefinitionQuery();
        query.processDefinitionId(processDefinitionId);
        ProcessDefinition processDefinition = query.singleResult();
        // 根据流程定义对象获得png图片的名称
        String pngName = processDefinition.getDiagramResourceName();

        // 直接获得png图片对应的输入流
        InputStream pngStream = processEngine.getRepositoryService().getProcessDiagram(processDefinitionId);
        // 读取输入流写到指定的本地磁盘上
        FileUtils.copyInputStreamToFile(pngStream, new File("D:\\activiti资料\\" + pngName));
        pngStream.close();
    }
    
    /**
     * 启动流程实例
     */
    @Test
    public void test6() {
    	// 方式一：根据流程定义的id来启动流程实例
        String processDefinitionId = "qjlc:2:2504"; // 流程定义id
        ProcessInstance processInstance = processEngine.getRuntimeService()
                .startProcessInstanceById(processDefinitionId); // 根据请假流程定义来具体地请一次假，即启动流程实例
        System.out.println(processInstance.getId());
        
        String processDefinitionKey = "qjlc"; // 流程定义的key
        // 方式二：根据流程定义的key来启动流程实例(建议)——可以自动选择最新版本的流程定义来启动流程实例
        ProcessInstance processInstance2 = processEngine.getRuntimeService().
        		startProcessInstanceByKey(processDefinitionKey);
        System.out.println(processInstance2.getId());
    }
    
    /**
     * 查询流程实例
     */
    @Test
    public void test62() {
        // 流程实例查询对象，操作的是流程实例表(act_ru_execution)
        ProcessInstanceQuery query = processEngine.getRuntimeService().createProcessInstanceQuery();
        List<ProcessInstance> list = query.list();
        for (ProcessInstance processInstance : list) {
            System.out.println(processInstance.getId());
        }
    }
    
    /**
     * 删除流程实例
     */
    @Test
    public void test63() {
        String processInstanceId = "22501"; // 流程实例id
        String deleteReason = "不想请假了"; // 删除原因，任君写
        processEngine.getRuntimeService().deleteProcessInstance(processInstanceId, deleteReason);
    }
    
    /**
     * 查询任务
     */
    @Test
    public void test7() {
        // 任务查询对象，操作的是任务表(act_ru_task)
        TaskQuery query = processEngine.getTaskService().createTaskQuery();
        // 根据任务的办理人过滤
        query.taskAssignee("张三"); // 只查询张三的任务，其他人的任务不查
        // query.taskAssignee("李四"); 
        // query.taskAssignee("王五"); 
        List<Task> list = query.list();
        for (Task task : list) {
            System.out.println(task.getId() + "\t" + task.getName() + "\t" + task.getAssignee());
        }
    }
    
    /**
     * 办理任务
     */
    @Test
    public void test8() {
        String taskId = "10002"; // 任务的id
        processEngine.getTaskService().complete(taskId);
    }

}