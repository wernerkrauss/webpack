<?php
/**
 * Created by PhpStorm.
 * User: gregorweindl
 * Date: 06.08.18
 * Time: 13:13
 */

namespace HSBPage\Pages;

use Page;

/**
 * Class \HSBPage\Pages\ElementalPage
 *
 * @property int $ElementalAreaID
 * @method \DNADesign\Elemental\Models\ElementalArea ElementalArea()
 * @mixin \DNADesign\Elemental\Extensions\ElementalPageExtension
 */
class ElementalPage  extends Page
{
    private static $table_name = 'ElementalPage';
}