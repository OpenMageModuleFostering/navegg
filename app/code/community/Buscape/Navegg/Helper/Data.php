<?php
/**
 * Magento
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/osl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to suporte.developer@buscape-inc.com so we can send you a copy immediately.
 *
 * @category   Buscape
 * @package    Buscape_Navegg
 * @copyright  Copyright (c) 2010 Buscapé Company (http://www.buscapecompany.com)
 * @license    http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */

class Buscape_Navegg_Helper_Data extends Mage_Core_Helper_Abstract
{
    
    
    public function isAvailable($store = null)
    {
        // you must do the call for getConfig and get the informations of account
        $accountId = Mage::getStoreConfig(Buscape_Navegg_Model_Config::XML_PATH_ACCOUNT, $store);
        return $accountId && Mage::getStoreConfigFlag(Buscape_Navegg_Model_Config::XML_PATH_ACTIVE, $store);
    }
}