package com.platform.controller;/**
 * @author Administrator
 * @create 2018-12-17 10:30
 * @desc 体重
 **/

import com.github.pagehelper.PageInfo;
import com.platform.entity.UserWeightEntity;
import com.platform.page.PageHelper;
import com.platform.service.WeightService;
import com.platform.utils.PageUtils;
import com.platform.utils.Query;
import com.platform.utils.R;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.List;
/**

 * @author Administrator

 * @create 2018-12-17 10:30

 * @desc 体重

 **/
@RestController
@RequestMapping("weight")
public class WeightController {
    @Autowired
    private WeightService weightService;
    @RequestMapping("/list")
    @RequiresPermissions("weight:list")
    public R list(@RequestParam Map<String,Object> params){
        Query query=new Query(params);
        PageHelper.startPage(query.getPage(),query.getLimit());
        List<UserWeightEntity> list=weightService.queryList(params);
        for (UserWeightEntity user:list) {
            System.out.println(user.getId());
        }
        PageUtils pageUtils=new PageUtils(new PageInfo(list));
        return R.ok().put("page",pageUtils);
    }
    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("weight:save")
    public R save(@RequestBody UserWeightEntity userWeightEntity) {
        weightService.save(userWeightEntity);

        return R.ok();
    }
    /**
     * 查看信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("weight:info")
    public R info(@PathVariable("id") Integer id) {
        UserWeightEntity weightEntity= weightService.queryObject(id);

        return R.ok().put("coupon", weightEntity);
    }
    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("weight:update")
    public R update(@RequestBody UserWeightEntity userWeightEntity) {
        weightService.update(userWeightEntity);

        return R.ok();
    }
    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("weight:delete")
    public R delete(@RequestBody Integer[] ids) {
        weightService.deletebatch(ids);

        return R.ok();
    }
}
