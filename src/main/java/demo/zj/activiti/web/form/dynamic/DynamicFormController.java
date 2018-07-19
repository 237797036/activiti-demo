package demo.zj.activiti.web.form.dynamic;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.activiti.engine.FormService;
import org.activiti.engine.HistoryService;
import org.activiti.engine.IdentityService;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.form.FormProperty;
import org.activiti.engine.history.HistoricProcessInstance;
import org.activiti.engine.history.HistoricProcessInstanceQuery;
import org.activiti.engine.identity.User;
import org.activiti.engine.impl.form.StartFormDataImpl;
import org.activiti.engine.impl.form.TaskFormDataImpl;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.repository.ProcessDefinitionQuery;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.runtime.ProcessInstanceQuery;
import org.activiti.engine.task.Task;
import org.activiti.engine.task.TaskQuery;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import demo.zj.activiti.entity.DataGrid;
import demo.zj.activiti.entity.PageParam;
import demo.zj.activiti.entity.ProcessDefEntity;
import demo.zj.activiti.entity.Ret;
import demo.zj.activiti.entity.TaskEntity;
import demo.zj.activiti.util.UserUtil;

/**
 * 动态表单Controller
 *
 * @author zj
 */
@Controller
@RequestMapping(value = "/form/dynamic")
public class DynamicFormController {
    private Logger logger = LoggerFactory.getLogger(getClass());
    
    @Autowired
    private RepositoryService repositoryService;
    @Autowired
    private FormService formService;
    @Autowired
    private TaskService taskService;
    @Autowired
    private IdentityService identityService;
    @Autowired
    private HistoryService historyService;
    @Autowired
    private RuntimeService runtimeService;

    /**
     * 动态form流程列表
     *
     * @param model
     * @return
     */
	@RequestMapping(value = {"process-list", ""})
    @ResponseBody
    public DataGrid processDefinitionList(@RequestParam(value = "processType", required = false) String processType, PageParam pageParam) {
    	DataGrid dataGrid = new DataGrid();
    	List<ProcessDefEntity> retlist = new ArrayList<ProcessDefEntity>();
        List<ProcessDefinition> list = new ArrayList<ProcessDefinition>();
        if (StringUtils.equals(processType, "all")) {
            /*
             * 只读取动态表单的流程
             */
        	
            ProcessDefinitionQuery query1 = repositoryService.createProcessDefinitionQuery().processDefinitionKey("leave-dynamic-from").active().orderByDeploymentId().desc();
            list= query1.listPage(pageParam.getFirstResult(), pageParam.getMaxResults());

            ProcessDefinitionQuery query2 = repositoryService.createProcessDefinitionQuery().processDefinitionKey("dispatch").active().orderByDeploymentId().desc();
            List<ProcessDefinition> dispatchList = query2.listPage(pageParam.getFirstResult(), pageParam.getMaxResults());

            ProcessDefinitionQuery query3 = repositoryService.createProcessDefinitionQuery().processDefinitionKey("leave-jpa").active().orderByDeploymentId().desc();
            List<ProcessDefinition> list3 = query3.listPage(pageParam.getFirstResult(), pageParam.getMaxResults());

            list.addAll(dispatchList);
            list.addAll(list3);

            /*page.setResult(list);
            page.setTotalCount(query1.count() + query2.count());*/
            dataGrid.setTotal(query1.count() + query2.count() + query3.count());
        } else {
            // 读取所有流程
            ProcessDefinitionQuery query = repositoryService.createProcessDefinitionQuery().active().orderByDeploymentId().desc();
            list = query.listPage(pageParam.getFirstResult(), pageParam.getMaxResults());
            
            /*page.setResult(list);
            page.setTotalCount(query.count());*/
            dataGrid.setTotal(query.count());
        }
        ProcessDefEntity processDefEntity = null;
        for (ProcessDefinition processDefinition : list) {
        	processDefEntity = new ProcessDefEntity();
        	BeanUtils.copyProperties(processDefinition, processDefEntity);
        	retlist.add(processDefEntity);
		}
        dataGrid.setRows(retlist);
        return dataGrid;
    }

    /**
     * 初始化启动流程，读取启动流程的表单字段来渲染start form
     */
    @RequestMapping(value = "get-form/start/{processDefinitionId}")
    @ResponseBody
    @SuppressWarnings("unchecked")
    public Map<String, Object> findStartForm(@PathVariable("processDefinitionId") String processDefinitionId) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        StartFormDataImpl startFormData = (StartFormDataImpl) formService.getStartFormData(processDefinitionId);
        startFormData.setProcessDefinition(null);
        
	    /*
	     * 读取enum类型数据，用于下拉框
	     */
        List<FormProperty> formProperties = startFormData.getFormProperties();
        for (FormProperty formProperty : formProperties) {
			Map<String, String> values = (Map<String, String>) formProperty.getType().getInformation("values");
            if (values != null) {
                for (Entry<String, String> enumEntry : values.entrySet()) {
                    logger.debug("enum, key: {}, value: {}", enumEntry.getKey(), enumEntry.getValue());
                }
                result.put("enum_" + formProperty.getId(), values);
            }
        }

        result.put("form", startFormData);

        return result;
    }

    /**
     * 读取Task的表单
     */
    @SuppressWarnings("unchecked")
    @RequestMapping(value = "get-form/task/{taskId}")
    @ResponseBody
    public Map<String, Object> findTaskForm(@PathVariable("taskId") String taskId) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        TaskFormDataImpl taskFormData = (TaskFormDataImpl) formService.getTaskFormData(taskId);

        // 设置task为null，否则输出json的时候会报错
        taskFormData.setTask(null);

        result.put("taskFormData", taskFormData);
    /*
     * 读取enum类型数据，用于下拉框
     */
        List<FormProperty> formProperties = taskFormData.getFormProperties();
        for (FormProperty formProperty : formProperties) {
            Map<String, String> values = (Map<String, String>) formProperty.getType().getInformation("values");
            if (values != null) {
                for (Entry<String, String> enumEntry : values.entrySet()) {
                    logger.debug("enum, key: {}, value: {}", enumEntry.getKey(), enumEntry.getValue());
                }
                result.put(formProperty.getId(), values);
            }
        }

        return result;
    }

    /**
     * 办理任务，提交task的并保存form
     */
    @RequestMapping(value = "task/complete/{taskId}")
    public String completeTask(@PathVariable("taskId") String taskId, @RequestParam(value = "processType", required = false) String processType,
                               RedirectAttributes redirectAttributes, HttpServletRequest request) {
        Map<String, String> formProperties = new HashMap<String, String>();

        // 从request中读取参数然后转换
        Map<String, String[]> parameterMap = request.getParameterMap();
        Set<Entry<String, String[]>> entrySet = parameterMap.entrySet();
        for (Entry<String, String[]> entry : entrySet) {
            String key = entry.getKey();

            // fp_的意思是form paremeter
            if (StringUtils.defaultString(key).startsWith("fp_")) {
                formProperties.put(key.split("_")[1], entry.getValue()[0]);
            }
        }

        logger.debug("start form parameters: {}", formProperties);

        User user = UserUtil.getUserFromSession(request.getSession());

        // 用户未登录不能操作，实际应用使用权限框架实现，例如Spring Security、Shiro等
        if (user == null || StringUtils.isBlank(user.getId())) {
            return "redirect:/login?timeout=true";
        }
        try {
            identityService.setAuthenticatedUserId(user.getId());
            formService.submitTaskFormData(taskId, formProperties);
        } finally {
            identityService.setAuthenticatedUserId(null);
        }

        redirectAttributes.addFlashAttribute("message", "任务完成：taskId=" + taskId);
        return "redirect:/form/dynamic/task/list?processType=" + processType;
    }

    /**
     * 提交启动流程
     */
    @RequestMapping(value = "start-process/{processDefinitionId}")
    @ResponseBody
    public Ret submitStartFormAndStartProcessInstance(@PathVariable("processDefinitionId") String processDefinitionId,@RequestParam(value = "processType", required = false) String processType,
                                                         HttpServletRequest request) {
    	Ret ret = new Ret();
        Map<String, String> formProperties = new HashMap<String, String>();

        // 从request中读取参数然后转换
        Map<String, String[]> parameterMap = request.getParameterMap();
        Set<Entry<String, String[]>> entrySet = parameterMap.entrySet();
        for (Entry<String, String[]> entry : entrySet) {
            String key = entry.getKey();

            // fp_的意思是form paremeter
            if (StringUtils.defaultString(key).startsWith("fp_")) {
                formProperties.put(key.split("_")[1], entry.getValue()[0]);
            }
        }

        logger.debug("start form parameters: {}", formProperties);

        User user = UserUtil.getUserFromSession(request.getSession());
        // 用户未登录不能操作，实际应用使用权限框架实现，例如Spring Security、Shiro等
        if (user == null || StringUtils.isBlank(user.getId())) {
        	ret.setCode("0401");
        	ret.setMessage("还未登录！");
        	return ret;
        }
        ProcessInstance processInstance = null;
        try {
            identityService.setAuthenticatedUserId(user.getId());
            processInstance = formService.submitStartFormData(processDefinitionId, formProperties);
            logger.debug("start a processinstance: {}", processInstance);
        } finally {
            identityService.setAuthenticatedUserId(null);
        }
        Map<String, String> retMap = new HashMap<String, String>();
        retMap.put("message", "启动成功，流程ID：" + processInstance.getId());
        retMap.put("processType", processType);
        ret.setData(retMap);
        return ret;
        //return "redirect:/form/dynamic/process-list?processType=" + processType;
    }

    /**
     * task列表
     *
     * @param model
     * @return
     */
    @RequestMapping(value = "task/list")
    @ResponseBody
    public DataGrid taskList(@RequestParam(value = "processType", required = false) String processType,
                                 HttpServletRequest request, PageParam pageParam) {
    	DataGrid dataGrid = new DataGrid();
        User user = UserUtil.getUserFromSession(request.getSession());
        // 用户未登录不能操作，实际应用使用权限框架实现，例如Spring Security、Shiro等
        if (user == null || StringUtils.isBlank(user.getId())) {
        	dataGrid.setCode("0401");
        	dataGrid.setMessage("还未登录！");
        	return dataGrid;
        }

        List<TaskEntity> retlist = new ArrayList<TaskEntity>();
        List<Task> taskList = new ArrayList<Task>();

        if (StringUtils.equals(processType, "all")) {
            /**
             * 这里为了演示区分开自定义表单的请假流程，值读取leave-dynamic-from
             * 在FormKeyController中有使用native方式查询的例子
             */

        	TaskQuery taskQuery1 = taskService.createTaskQuery();
            List<Task> dynamicFormTasks = taskQuery1.processDefinitionKey("leave-dynamic-from")
                    .taskCandidateOrAssigned(user.getId()).active().orderByTaskId().desc().listPage(pageParam.getFirstResult(), pageParam.getMaxResults());

            TaskQuery taskQuery2 = taskService.createTaskQuery();
            List<Task> dispatchTasks = taskQuery2.processDefinitionKey("dispatch")
                    .taskCandidateOrAssigned(user.getId()).active().orderByTaskId().desc().listPage(pageParam.getFirstResult(), pageParam.getMaxResults());

            TaskQuery taskQuery3 = taskService.createTaskQuery();
            List<Task> leaveJpaTasks = taskQuery3.processDefinitionKey("leave-jpa")
                    .taskCandidateOrAssigned(user.getId()).active().orderByTaskId().desc().listPage(pageParam.getFirstResult(), pageParam.getMaxResults());

            taskList.addAll(dynamicFormTasks);
            taskList.addAll(dispatchTasks);
            taskList.addAll(leaveJpaTasks);
            
            dataGrid.setTotal(taskQuery1.count()+taskQuery2.count()+taskQuery3.count());
            
        } else {
        	TaskQuery taskQuery = taskService.createTaskQuery();
        	taskList = taskQuery.taskCandidateOrAssigned(user.getId()).active().orderByTaskId().desc().listPage(pageParam.getFirstResult(), pageParam.getMaxResults());
            dataGrid.setTotal(taskQuery.count());
        }
        
        TaskEntity taskEntity = null;
        for (Task task : taskList) {
        	taskEntity = new TaskEntity();
        	BeanUtils.copyProperties(task, taskEntity);
        	retlist.add(taskEntity);
		}
        dataGrid.setRows(retlist);
        return dataGrid;
    }

    /**
     * 签收任务
     */
    @RequestMapping(value = "task/claim/{id}")
    @ResponseBody
    public Ret claim(@PathVariable("id") String taskId, HttpSession session, String processType) {
    	Ret ret = new Ret();
    	User user = UserUtil.getUserFromSession(session);
        if (user == null || StringUtils.isBlank(user.getId())) {
        	ret.setCode("0401");
        	ret.setMessage("还未登录！");
        	return ret;
        }
        
        taskService.claim(taskId, user.getId());
        Map<String, String> retMap = new HashMap<String, String>();
        retMap.put("message", "任务已签收，任务ID=" + taskId);
        retMap.put("processType", processType);
        ret.setData(retMap);
        return ret;
    }

    /**
     * 运行中的流程实例
     *
     * @param model
     * @return
     */
    @RequestMapping(value = "process-instance/running/list")
    public ModelAndView running(Model model, @RequestParam(value = "processType", required = false) String processType,
    		PageParam pageParam) {
        ModelAndView mav = new ModelAndView("/form/running-list", Collections.singletonMap("processType", processType));

        List<ProcessInstance> list = new ArrayList<ProcessInstance>();
        if (!StringUtils.equals(processType, "all")) {
            ProcessInstanceQuery leaveDynamicQuery = runtimeService.createProcessInstanceQuery()
                    .processDefinitionKey("leave-dynamic-from").orderByProcessInstanceId().desc().active();
            list = leaveDynamicQuery.listPage(pageParam.getFirstResult(), pageParam.getMaxResults());

            ProcessInstanceQuery dispatchQuery = runtimeService.createProcessInstanceQuery()
                    .processDefinitionKey("dispatch").active().orderByProcessInstanceId().desc();
            List<ProcessInstance> list2 = dispatchQuery.listPage(pageParam.getFirstResult(), pageParam.getMaxResults());
            list.addAll(list2);

            ProcessInstanceQuery leaveJpaQuery = runtimeService.createProcessInstanceQuery()
                    .processDefinitionKey("leave-jpa").active().orderByProcessInstanceId().desc();
            List<ProcessInstance> list3 = leaveJpaQuery.listPage(pageParam.getFirstResult(), pageParam.getMaxResults());
            list.addAll(list3);

            /*page.setResult(list);
            page.setTotalCount(leaveDynamicQuery.count() + dispatchQuery.count());*/
        } else {
            ProcessInstanceQuery dynamicQuery = runtimeService.createProcessInstanceQuery().orderByProcessInstanceId().desc().active();
            list = dynamicQuery.listPage(pageParam.getFirstResult(), pageParam.getMaxResults());
            /*page.setResult(list);
            page.setTotalCount(dynamicQuery.count());*/
        }
        mav.addObject("page", list);
        return mav;
    }

    /**
     * 已结束的流程实例
     *
     * @param model
     * @return
     */
    @RequestMapping(value = "process-instance/finished/list")
    public ModelAndView finished(Model model, @RequestParam(value = "processType", required = false) String processType,
    		PageParam pageParam) {
        ModelAndView mav = new ModelAndView("/form/finished-list", Collections.singletonMap("processType", processType));

        List<HistoricProcessInstance> list = new ArrayList<HistoricProcessInstance>();
        if (!StringUtils.equals(processType, "all")) {
            HistoricProcessInstanceQuery leaveDynamicQuery = historyService.createHistoricProcessInstanceQuery()
                    .processDefinitionKey("leave-dynamic-from").finished().orderByProcessInstanceEndTime().desc();
            list = leaveDynamicQuery.listPage(pageParam.getFirstResult(), pageParam.getMaxResults());

            HistoricProcessInstanceQuery dispatchQuery = historyService.createHistoricProcessInstanceQuery()
                    .processDefinitionKey("dispatch").finished().orderByProcessInstanceEndTime().desc();
            List<HistoricProcessInstance> list2 = dispatchQuery.listPage(pageParam.getFirstResult(), pageParam.getMaxResults());

            HistoricProcessInstanceQuery leaveJpaQuery = historyService.createHistoricProcessInstanceQuery()
                    .processDefinitionKey("leave-jpa").finished().orderByProcessInstanceEndTime().desc();
            List<HistoricProcessInstance> list3 = leaveJpaQuery.listPage(pageParam.getFirstResult(), pageParam.getMaxResults());

            list.addAll(list2);
            list.addAll(list3);

            /*page.setResult(list);
            page.setTotalCount(leaveDynamicQuery.count() + dispatchQuery.count());*/
        } else {
            HistoricProcessInstanceQuery dynamicQuery = historyService.createHistoricProcessInstanceQuery()
                    .finished().orderByProcessInstanceEndTime().desc();
            list = dynamicQuery.listPage(pageParam.getFirstResult(), pageParam.getMaxResults());
            /*page.setResult(list);
            page.setTotalCount(dynamicQuery.count());*/
        }

        mav.addObject("page", list);
        return mav;
    }

}
