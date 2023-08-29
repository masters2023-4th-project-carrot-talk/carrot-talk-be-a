package com.example.carrot.user_location.entity;

import com.example.carrot.global.common.BaseTimeEntity;
import com.example.carrot.location.entity.Location;
import com.example.carrot.user.entity.User;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
public class UserLocation extends BaseTimeEntity {
    @Id
    @GeneratedValue
    private Long userLocationId;

    private boolean isMain;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id")
    private Location location;

    @Builder
    public UserLocation(Long userLocationId, boolean isMain, User user, Location location) {
        this.userLocationId = userLocationId;
        this.isMain = isMain;
        this.user = user;
        this.location = location;
    }
}
