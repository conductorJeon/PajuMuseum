package com.sist.web.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sist.web.entity.Comment;

public interface CommentsRepository extends JpaRepository<Comment, Integer> {
  @Query(value = """
          SELECT *
          FROM comment
          WHERE target_type = :targetType
            AND target_no = :targetNo
          ORDER BY no DESC
          """, countQuery = """
          SELECT COUNT(*)
          FROM comment
          WHERE target_type = :targetType
            AND target_no = :targetNo
                  """, nativeQuery = true)
  public Page<Comment> findByTarget(@Param("targetType") String targetType,
      @Param("targetNo") String targetNo, Pageable pageable);

  @Query(value = """
      SELECT COUNT(*)
      FROM comment
      WHERE target_type = :targetType
        AND target_no = :targetNo
      ORDER BY no DESC
      """, nativeQuery = true)
  public int findByTargetCounts(@Param("targetType") String targetType, @Param("targetNo") String targetNo);
}
