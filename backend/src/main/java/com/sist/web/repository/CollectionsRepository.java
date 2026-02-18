package com.sist.web.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sist.web.entity.EmuseumRelicDetail;
import com.sist.web.view.CollectionsDetailView;
import com.sist.web.view.CollectionsListView;

public interface CollectionsRepository extends JpaRepository<EmuseumRelicDetail, String> {
  @Query(value = """
          SELECT
            e.id AS id,
            e.name_kr AS nameKr,
            e.museum_name1 AS museumName,
            e.material_name1 AS materialName,
            e.nationality_name1 AS nationalityName,
            e.img_thumb_m AS imgThumbM
            FROM emuseum_relic_detail e
          ORDER BY e.id ASC
      """, nativeQuery = true)
  public List<CollectionsListView> collectionsList(Pageable pageable);
  
  @Query(value = """
          SELECT
            e.id AS id,
            e.name_kr AS nameKr,
            e.museum_name1 AS museumName,
            e.material_name1 AS materialName,
            e.nationality_name1 AS nationalityName,
            e.img_thumb_m AS imgThumbM,
            e.desc_text AS description
          FROM emuseum_relic_detail e
          WHERE e.id = :id
          """, nativeQuery = true)
  public CollectionsDetailView collectionsDetail(@Param("id") String id);
}
