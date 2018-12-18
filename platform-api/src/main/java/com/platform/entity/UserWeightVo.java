package com.platform.entity;/**
 * @author Administrator
 * @create 2018-12-14 14:55
 * @desc 体重记录
 **/

import java.io.Serializable;
import java.util.Date;

/**

 * @author Administrator

 * @create 2018-12-14 14:55

 * @desc 体重记录

 **/
public class UserWeightVo implements Serializable {
    private static final long serialVersionUID = 1L;

    //主键
    private Integer id;

    private Integer userId;

    private Double weight;

    private Date createDate;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }
}
