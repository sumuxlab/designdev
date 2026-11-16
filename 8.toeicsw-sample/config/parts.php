<?php
/**
 * 파트(문제 유형) 정의 — 시험 형식이 바뀔 때만 수정합니다.
 * 차수마다 바뀌는 내용(지문, 사진, 음성)은 data/rounds/*.json 에 있습니다.
 *
 * key        : 차수 JSON에서 이 파트를 찾는 이름
 * type       : 화면 렌더러 종류 (inc/render.php)
 * from / to  : 문항 번호 범위 → "Questions 3-4 of 11", 문항 번호가 자동 생성됨
 * direction  : Directions 본문 (기존 페이지 문구를 옮겨 넣으세요)
 * criteria   : (Writing) 채점 기준 불릿
 * direction_after : (Writing) 불릿 아래 안내 문단
 * notice     : 빨간 안내 문구
 *
 * ※ direction 문구는 차수 JSON에 "direction" 키를 넣으면 그 차수만 덮어쓸 수 있습니다.
 */
return array(

  'spe' => array(
    'label' => 'Speaking',
    'total' => 11,
    'intro' => 'intro_spe.php',
    'parts' => array(
      array(
        'key' => 'read_aloud', 'type' => 'text_list',
        'from' => 1, 'to' => 2,
        'title' => 'Read a text aloud',
        'sub' => '답변 준비시간 45초, 답변시간 45초',
        'direction' => '[기존 testSpe01.php의 Directions 문구]',
      ),
      array(
        'key' => 'describe_picture', 'type' => 'picture_list',
        'from' => 3, 'to' => 4,
        'title' => 'Describe a picture',
        'sub' => '답변 준비시간 45초, 답변시간 30초',
        'direction' => '[기존 testSpe02.php의 Directions 문구]',
      ),
      array(
        'key' => 'respond_questions', 'type' => 'question_set',
        'from' => 5, 'to' => 7,
        'title' => 'Respond to questions',
        'sub' => '답변 준비시간 문항당 3초, 답변시간 15~30초',
        'direction' => '[기존 testSpe03.php의 Directions 문구]',
      ),
      array(
        'key' => 'respond_info', 'type' => 'question_set',
        'from' => 8, 'to' => 10,
        'title' => 'Respond to questions using information provided',
        'sub' => '답변 준비시간 문항당 3초 (지문 읽는 시간 45초), 답변시간 15~30초',
        'direction' => '[기존 testSpe04.php의 Directions 문구]',
        'notice' => '* 실제 시험에서는 위의 일정만 나오고, 아래의 지문과 Question은 음성으로만 제공됩니다.',
      ),
      array(
        'key' => 'opinion', 'type' => 'question_set',
        'from' => 11, 'to' => 11,
        'title' => 'Express an opinion',
        'sub' => '답변 준비시간 45초, 답변시간 60초',
        'direction' => '[기존 testSpe05.php의 Directions 문구]',
      ),
    ),
  ),

  'wri' => array(
    'label' => 'Writing',
    'total' => 8,
    'intro' => 'intro_wri.php',
    'parts' => array(
      array(
        'key' => 'picture_sentence', 'type' => 'picture_keywords',
        'from' => 1, 'to' => 5,
        'title' => 'Write a sentence based on the picture',
        'sub' => '답변 시간 5문항에 총 8분',
        'direction' => '[기존 testWri01.php의 Directions 문구]',
        'criteria' => array('the appropriate use of grammar and', 'the relevance of the sentence to the picture.'),
        'direction_after' => '[기존 testWri01.php의 Next/Back 안내 문구]',
      ),
      array(
        'key' => 'email', 'type' => 'email',
        'from' => 6, 'to' => 7,
        'title' => 'Respond to a written request',
        'sub' => '답변 시간 문항 당 10분',
        'direction' => '[기존 testWri02.php의 Directions 문구]',
        'criteria' => array('the quality and variety of your sentences,', 'vocabulary, and', 'organization.'),
        'direction_after' => 'You will have 10 minutes to read and answer each e-mail.',
        'response_time' => 'Response time: 10 minutes',
      ),
      array(
        'key' => 'essay', 'type' => 'essay',
        'from' => 8, 'to' => 8,
        'title' => 'Write an opinion essay',
        'sub' => '답변 시간 30분',
        'direction' => '[기존 testWri03.php의 Directions 문구]',
        'criteria' => array('whether your opinion is supported with reasons and/or examples.', 'grammar,', 'vocabulary, and', 'organization.'),
        'question_direction' => '[기존 testWri03.php의 "Directions: Read the question below..." 문구]',
      ),
    ),
  ),
);
