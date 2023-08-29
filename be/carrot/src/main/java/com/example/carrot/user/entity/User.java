package com.example.carrot.user.entity;

import com.example.carrot.global.common.BaseAllTimeEntity;
import com.example.carrot.like.entity.Like;
import com.example.carrot.sales_history.entity.SalesHistory;
import com.example.carrot.user_location.entity.UserLocation;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "users")
public class User extends BaseAllTimeEntity {
    @Id
    @GeneratedValue
    private Long userId;
    private String nickName;
    private String imageUrl;
    private String refreshToken;
    private String socialId;

    @OneToMany(mappedBy = "user")
    private List<UserLocation> userLocations = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Like> likes = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<SalesHistory> salesHistories = new ArrayList<>();

    @Builder
    public User(Long userId, String nickName, String imageUrl, String refreshToken, String socialId,
        List<UserLocation> userLocations, List<Like> likes, List<SalesHistory> salesHistories) {
        this.userId = userId;
        this.nickName = nickName;
        this.imageUrl = imageUrl;
        this.refreshToken = refreshToken;
        this.socialId = socialId;
        this.userLocations = userLocations;
        this.likes = likes;
        this.salesHistories = salesHistories;
    }
}
