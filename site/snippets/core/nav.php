<?php

/** @var Kirby\Cms\Site $site */ ?>

<header class="fixed print:hidden w-full top-0 items-center justify-between flex px-4 py-4 text-white font-stretch font-bold z-40 gap-4 before:transition-all before:duration-500 before:opacity-0 before:absolute before:inset-0 before:transform before:-translate-y-full before:bg-black before:content-['']" data-controller="nav">
	<a class="flex flex-1 relative bg-no-repeat bg-contain bg-left-top" href="/">
		<?php if ($asset = asset('assets/images/run-logo-white.svg')) : ?>
			<img src="<?= $asset->url() ?>" height="77" width="300" alt="Dinkel Survivalrun">
		<?php endif ?>
	</a>
	<nav class="flex flex-[2] print:hidden justify-end sm:justify-center">
		<ul class="gap-8 uppercase bg-black overflow-auto sm:overflow-visible sm:flex flex-col sm:flex-row pt-24 pb-12 sm:pb-0 sm:pt-0 sm:visible sm:opacity-100 sm:static sm:bg-transparent sm:items-center opacity-100 pointer-events-auto visible translate-y-0">
			<?php foreach ($site->children()->listed() as $child) : ?>
				<?php $isActive = $child->isActive() ?>
				<li class="group font-expanded">
					<?php if ($child->hasChildren()) : ?>
						<button class="uppercase transition-all group-hover:text-dsr-orange relative block whitespace-nowrap font-expanded">
							<?= $child->title(); ?>
							<?php snippet('icon', ['icon' => 'chevron-down', 'class' => 'size-6 fill-current inline-block']) ?>
						</button>

						<ul class="transition-all px-8 sm:invisible sm:absolute sm:top-full sm:w-64 sm:bg-white sm:p-4 sm:text-black sm:rounded sm:opacity-0 sm:pointer-events-none sm:-translate-y-1 sm:drop-shadow-lg group-hover:sm:opacity-100 group-hover:sm:translate-y-0 group-hover:sm:pointer-events-auto group-hover:sm:visible">
							<?php foreach ($child->children()->listed() as $subchild) : ?>
								<li>
									<a class="hover:text-dsr-orange py-2 block" href="<?= $subchild->url(); ?>">
										<?= $subchild->title(); ?>
									</a>
								</li>
							<?php endforeach ?>
						</ul>
					<?php else : ?>
						<a href="<?= $child->url(); ?>" class="uppercase transition-all hover:text-dsr-orange relative block whitespace-nowrap"><?= $child->title(); ?></a>
					<?php endif; ?>
				</li>
			<?php endforeach ?>
		</ul>
		<button class="uppercase p-2 border relative rounded text-sm sm:hidden" onClick={toggleNavigation} type="button">
			Menu
		</button>
	</nav>
	<span class="sm:block flex-1 hidden"></span>
</header>
<div class="nav-sentinel" style="position: absolute; top: 10px; width: 1px; height: 1px; visibility: hidden;"></div>
