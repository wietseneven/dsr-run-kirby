<header class="print:hidden relative overflow-hidden flex flex-col text-white pt-[clamp(7rem,30vh,15rem)] gradient-overlay">
	<?php snippet('picture', ['image' => $site->headerImage()->toFile(), 'class' => 'absolute inset-0']); ?>
	<div class="relative max-w-7xl mx-auto z-20 w-[90%]">
		<h1 class="mb-4 text-4xl sm:text-5xl md:text-7xl font-bold font-extra-expanded uppercase text-dsr-orange max-w-6xl">
			<?= $page->title() ?>
		</h1>
		<nav aria-label="Breadcrumb" class="print:hidden mt-8 py-8">
			<ol aria-label="breadcrumbs" class="flex flex-wrap items-center gap-3">
				<?php foreach ($site->breadcrumb() as $crumb) : ?>
					<?php $is_last = $crumb === $site->breadcrumb()->last() ?>
					<li class="leading-none flex <?php e(!$is_last, "after:content['>'] after:ml-3 after:inline-block after:w-4 after:h-4 after:bg-white after:[mask-image:url('/assets/icons/chevron-right.svg')]") ?>">
						<a class="hover:text-dsr-orange" property="item" typeof="WebPage" href="<?= $crumb->url() ?>"><?= $crumb->title() ?></a>
					</li>
				<?php endforeach ?>
			</ol>
		</nav>
	</div>
</header>
