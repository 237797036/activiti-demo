package com.zj.test;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.zip.ZipInputStream;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.repository.Deployment;
import org.activiti.engine.repository.DeploymentBuilder;
import org.activiti.engine.runtime.ProcessInstance;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class) //使用junit4进行测试
@ContextConfiguration(locations={"classpath:applicationContext-test.xml"}) //加载配置文件
public class Test {
	
	@Autowired ProcessEngine processEngine;
	
	
	/**
     * 部署流程定义 
     * 一套定义文件只有一个流程定义Key, 但可以被部署多次形成多个版本(部署表里多个id和流程定义表里多个id)
     * 涉及的表：act_re_deployment(部署表)、act_re_procdef(流程定义表)、act_ge_bytearray(二进制表)
     */
	
	@org.junit.Test
    public void test1() throws FileNotFoundException {
        DeploymentBuilder deploymentBuilder = processEngine.getRepositoryService().createDeployment();
        // 逐个文件部署
        // deploymentBuilder.addClasspathResource("qjlc.bpmn");
        // deploymentBuilder.addClasspathResource("qjlc.png");
        // 压缩文件打包部署, 推荐
        ZipInputStream zipInputStream = new ZipInputStream(new FileInputStream(new File("D:\\leave-dynamic-form\\leave-dynamic-form.zip")));
        deploymentBuilder.addZipInputStream(zipInputStream );
        
        Deployment deployment = deploymentBuilder.deploy();
    }
	
	// 删除部署
	@org.junit.Test
    public void test11(){
        String deploymentId = "1";  //部署id
        boolean cascade = true;  // 级联删除, 设置为true的话, 有正在跑的流程实例及任务也会被删除
        processEngine.getRepositoryService().deleteDeployment(deploymentId, cascade);
    }
	
	@org.junit.Test
    public void test2() throws Exception{
        String processDefinitionKey = "leave";
        //方式一：根据流程定义id启动流程实例
        //String processDefinitionId = "qjlc:6:904";
        //ProcessInstance processInstance = processEngine.getRuntimeService().startProcessInstanceById(processDefinitionId);
        
        //方式二：根据流程定义Key启动流程实例   推荐!流程定义有多个版本时会选择最新版本
        ProcessInstance processInstance = processEngine.getRuntimeService().startProcessInstanceByKey(processDefinitionKey);
    }
	
	/**
    * 办理任务, 办理后框架自动移动到下一任务
    * 涉及的表: act_ru_execution(流程实例表)、act_ru_task(任务表)
    */
	@org.junit.Test
    public void test() throws Exception{
        String taskId = "17502";
        processEngine.getTaskService().complete(taskId);
    }

}
