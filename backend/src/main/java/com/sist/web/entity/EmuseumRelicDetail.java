package com.sist.web.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "emuseum_relic_detail")
@Data
public class EmuseumRelicDetail {
  @Id
  private String id;
  
  private String name_kr;
  private String name_cn;
  private String name_origin;
  
  @Lob
  private String desc_text;
  
  private String museum_name1;
  private String museum_name2;
  private String museum_name3;
  
  private String relic_no;
  private String relic_sub_no;
  
  private String purpose_name1;
  private String purpose_name2;
  private String purpose_name3;
  
  private String material_code;
  private String material_name1;
  
  private String nationality_code;
  private String nationality_name1;
  private String nationality_name2;
  
  private String size_info;
  private String size_range_name;
  
  @Lob
  private String index_word;
  @Lob
  private String img_uri;
  @Lob
  private String img_thumb_s;
  @Lob
  private String img_thumb_m;
  @Lob
  private String img_thumb_l;
}
