<?php

/** @var \Kirby\Cms\Block $block */ ?>
<<?= $level = $block->level()->or('h2') ?> <?= $block->attr(['class' => $class ?? null]) ?>><?= $block->text() ?></<?= $level ?>>
