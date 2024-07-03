<?php
$attr ??= [];
?>

<svg <?= attr([
				'class' => ['icon', $class ?? ''],
				...$attr
			]) ?> aria-hidden="true">
	<use xlink:href="/assets/sprite.svg#<?= $icon; ?>"></use>
</svg>