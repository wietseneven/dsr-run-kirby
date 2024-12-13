<?php

/** @var \Kirby\Cms\Block $block */ ?>
<?php $sponsorPage = $site->find('page://sponsors') ?>
<div <?= $block->attr(['class' => ['', $class ?? null]]) ?>>
	<header class="prose text-center mb-8 w-full mx-auto">
		<h2>Hoofdsponsor</h2>
		<?php foreach ($sponsorPage->sponsors()->filterBy('priority', 'high') as $sponsor) : ?>
			<?php $image = $sponsor->logo()->toFile() ?>
			<a class="flex flex-col justify-between h-full no-underline" href="<?= $sponsor->url(); ?>">
				<?php snippet('picture', ['image' => $image, 'class' => 'mb-2 mx-auto w-full max-w-80', 'imgClass' => 'mx-auto']) ?>
				<span class="text-sm font-normal"><?= $sponsor->name() ?></span>
			</a>
		<?php endforeach ?>
	</header>
	<ul class="grid lg:grid-cols-4 gap-8 lg:gap-16 w-full text-center border-t border-gray-200 pt-8">
		<?php foreach ($sponsorPage->sponsors()->shuffle() as $sponsor) : ?>
			<?php $image = $sponsor->logo()->toFile() ?>
			<li>
				<?php if ($sponsor->url()->isNotEmpty()) : ?>
					<a class="flex flex-col justify-between h-full no-underline" href="<?= $sponsor->url(); ?>">
						<span></span>
						<?php snippet('picture', ['image' => $image, 'class' => 'mb-2 mx-auto w-full max-w-52', 'imgClass' => 'mx-auto']) ?>
						<span class="text-sm font-normal"><?= $sponsor->name() ?></span>
					</a>
				<?php else : ?>
					<?php snippet('picture', ['image' => $image, 'class' => 'mb-2 mx-auto w-full max-w-52', 'imgClass' => 'mx-auto']) ?>
					<span class="text-sm font-normal"><?= $sponsor->name() ?></span>
				<?php endif ?>
			</li>
		<?php endforeach ?>
	</ul>
</div>